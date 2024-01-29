export type HotelType = {
    _id : string,
    userID : string,
    name : string,
    city : string,
    country : string,
    description : string,
    type : string,
    adultCount : number,
    childCount : number,
    facilities : string[],
    pricePerNight : number,
    starRating : number,
    imageUrls : string[],
    lastUpdated : Date
}