import express, {Request, Response} from 'express'
import Hotel from '../models/Hotel';
import { HotelSearchResponse } from '../../shared/types';
const router = express.Router();

router.get("/search", async (req : Request, res : Response) => {
    try{
        const query = constructSearchQuery(req.query);

        let sortOption = {};
        switch(req.query.searchOption) {
            case "starRating":
                sortOption = {starRating : -1}
                break;
            case "pricePerNightAsc" : 
                sortOption = {pricePerNight : 1}
                break;
            case "pricePerNightDesc" : 
                sortOption = {pricePerNight : -1}
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")

        const skip = (pageNumber-1)*pageSize;

        const hotels = await Hotel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(pageSize)
        
        const total = await Hotel.countDocuments(query);

        const response : HotelSearchResponse = {
            data : hotels,
            pagination : {
                total,
                page : pageNumber,
                pages : Math.ceil( total / pageSize)
            }
        }

        return res.json(response);
    } catch(err){
        console.log("Error : ", err);
        return res.status(500).send({message : "Error displaying hotels"})
    }
})

const constructSearchQuery = (queryParams : any) => {
    let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
}

export default router;