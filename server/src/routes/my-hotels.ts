import express, { Request, Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { HotelType } from '../../shared/types';
import Hotel from '../models/Hotel'
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5*1024*1024,
    },
})

router.post('/', verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
], upload.array("imageFiles", 6), async(req : Request, res : Response) => {
    try{
        const fileImages = req.files as Express.Multer.File[];
        console.log(fileImages)
        const newHotel : HotelType = req.body;

        //1. Add images to cloudinary
        const uploadPromises = fileImages.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = `data:${image.mimetype};base64,${b64}`;

            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url;
        });

        const imageURLs = await Promise.all(uploadPromises);
        //2. If successful, add image URLs to new Hotel
        newHotel.imageUrls = imageURLs;
        newHotel.lastUpdated = new Date();
        newHotel.userID = req.userID;

        //3. Add data to db

        const hotel = await Hotel.create(newHotel);
        //4. return 201
        return res.status(201).send(hotel);


    }
    catch(e : any){
        console.log("Error while creating hotel : " , e);
        return res.status(500).json({message : "Something went wrong"})
    }
    
})

router.get('/', verifyToken, async (req : Request, res : Response) => {
    
    try {
        const hotels = await Hotel.find({userID : req.userID});
        return res.json(hotels);
    } catch (error) {
        return res.status(500).send({message : "Error fetching hotels"});
    }
})
export default router;