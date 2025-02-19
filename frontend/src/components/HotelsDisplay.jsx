import React from "react";
import { useHotelStore } from "../store/hotelStore";
import HotelCard from "./HotelCard";

export default function HotelsDisplay() {
  const { isGettingHotels,  city_code, hotels_of_city } = useHotelStore();
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Hotels in your Destination</h2>
      {hotels_of_city.length === 0 ? (
        <p className="text-center text-gray-500">No hotels available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels_of_city.map((hotel, index) => (
            <HotelCard key={hotel.hotel_id || index} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
