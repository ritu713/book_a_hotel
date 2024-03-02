import { HotelType } from "../../../server/shared/types"

type Props = {
    checkIn : Date,
    checkOut : Date,
    adultCount : number,
    childCount : number,
    noOfNights : number,
    hotel : HotelType
}
const BookingDetailsSummary = ({checkIn, checkOut, adultCount, childCount, noOfNights, hotel} : Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your booking details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>

      <div className="flex justify-between">
        Check-in:
        <div className="font-bold">{checkIn.toDateString()}</div>
      </div>
      <div className="flex justify-between">
        Check-out:
        <div className="font-bold">{checkOut.toDateString()}</div>
      </div>

      <div className="border-t border-b py-2">
        Total length of stay
        <div className="font-bold">{noOfNights} nights</div>
      </div>

      <div>
        Guests:
        <div className="font-bold">{adultCount} adults, {childCount} children</div>
      </div>
    </div>
  )
}

export default BookingDetailsSummary
