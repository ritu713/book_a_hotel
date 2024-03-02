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
    lastUpdated : Date,
    bookings : BookingType[]
}

export type HotelSearchResponse = {
    data : HotelType[],
    pagination : {
        total : number,
        page : number,
        pages : number
    }
}

export type PaymentIntentResponse = {
    paymentIntentId : string,
    clientSecret : string,
    totalCost : number,
}

export type BookingType = {
    _id : string,
    userID : string,
    firstName : string,
    lastName : string,
    email : string,
    adultCount : number,
    childCount : number,
    checkIn : Date,
    checkOut : Date,
    totalCost : number,
}