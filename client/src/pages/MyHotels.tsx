import {Link} from 'react-router-dom'
import * as apiClient from '../api-client'
import { useQuery } from 'react-query'
import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'

const MyHotels = () => {
  const { data : hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {

    }
  })

  if(!hotelData){
    return <span>No hotels found</span>;
  }


  return (
    <div className="space-y-5">
        <span className='flex justify-between'>
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <Link to="/add-hotel" className="bg-blue-600 flex text-white text-xl font-bold p-2 hover:bg-blue-500">Add Hotel</Link>
        </span>

        <div className='grid grid-cols-1 gap-10'>
          {
            hotelData.map((hotel) => {
              return (
                //cards
                <div className='flex flex-col border justify-between border-slate-300 rounded-lg p-8 gap-5'>

                  <h2 className='text-2xl font-bold'>{hotel.name}</h2>
                  <div className='whitespace-pre-line'>{hotel.description}</div>

                  <div className='grid grid-cols-5 gap-2'>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                      <BsMap className='mr-1'/>
                      {hotel.city}, {hotel.country}
                    </div>

                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                      <BsBuilding className='mr-1'/>
                      {hotel.type}
                    </div>

                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                      <BiMoney className='mr-1'/>
                      Rs. {hotel.pricePerNight} per night
                    </div>

                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                      <BiHotel className='mr-1'/>
                      {hotel.adultCount} adults, {hotel.childCount} children
                    </div>

                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                      <BiStar className='mr-1'/>
                      {hotel.starRating} stars
                    </div>

                  </div>

                  <span className='flex justify-end'>
                      <Link to={`/edit-hotel/${hotel._id}`} className="bg-blue-600 flex text-white font-bold p-2 hover:bg-blue-500">View Details</Link>
                  </span>
                </div>
              )
            })
          }
        </div>
      
    </div>
  )
}

export default MyHotels 
