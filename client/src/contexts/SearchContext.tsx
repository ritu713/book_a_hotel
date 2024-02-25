import React, { useContext, useState } from "react";

type SearchContextType = {
    destination : string,
    checkIn : Date,
    checkOut : Date,
    adultCount : number,
    childCount : number,
    hotelID : string,
//function
    saveSearchValues : (destination : string, checkIn : Date, checkOut : Date, adultCount : number, childCount : number) => void
};

type SearchContextProviderProps = {
    children : React.ReactNode
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({ children } : SearchContextProviderProps) => {

    const [destination, setDestination] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(2);
    const [childCount, setChildCount] = useState<number>(0);
    const [hotelID, setHotelID] = useState<string>("");

    const saveSearchValues = (destination : string, checkIn : Date, checkOut : Date, adultCount : number, childCount : number, hotelID? : string) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if(hotelID){
            setHotelID(hotelID)
        }
    }

    return (
        <SearchContext.Provider value={{destination, checkIn, checkOut, adultCount, childCount, hotelID, saveSearchValues}}>
            {
                children
            }
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContextType;
}
