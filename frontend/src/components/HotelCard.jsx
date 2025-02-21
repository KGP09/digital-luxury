import { MapPin, Star } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router';
import { useHotelStore } from '../store/hotelStore';
export default function HotelCard(hotelData) {
    const hotel = hotelData.hotel
    const {city_code , arrival_date , departure_date , getRooms } = useHotelStore()
    const navigate = useNavigate();
    const handleClick = async () =>{
        const res = await getRooms({ hotel_id : hotel.hotel_id , arrival_date , departure_date});
        navigate(`/hotels/${city_code}/${hotel.hotel_id}`)
        // console.log(res);
    }
    // console.log(hotel)
    return (
        <div className="card w-full max-w-md bg-white shadow-xl rounded-xl">
          <figure>
            <img
              src={hotel?.property?.photoUrls?.[0] ?? "https://via.placeholder.com/500"}
              alt={hotel?.name ?? "Hotel Image"}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{hotel?.accessibilityLabel.split(".")[0] ?? "Unknown Hotel"}</h2>
            <p className="text-sm text-gray-500 flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" /> {hotel?.property?.accuratePropertyClass ?? "N/A"} Star Hotel
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-4 h-4 text-gray-400 mr-1" /> {hotel?.accessibilityLabel?.split('\n')[3] ?? "No location info"}
            </p>
            <p className="badge badge-error">Early 2025 Deal</p>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                ₹{hotel?.property?.priceBreakdown?.grossPrice?.value?.toLocaleString("en-IN") ?? "N/A"}
              </span>
              <span className="text-sm line-through text-gray-500">
                ₹{hotel?.priceBreakdown?.strikethroughPrice?.value?.toLocaleString("en-IN") ?? "N/A"}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              +₹{hotel?.prop?.priceBreakdown?.excludedPrice?.value?.toLocaleString("en-IN") ?? "0"} taxes
            </p>
            <p className="text-sm text-bold  text-gray-700">{hotel?.property?.reviewScoreWord ?? "No Rating"}</p>
            <div className="card-actions mt-2">
              <button  onClick={handleClick}  className="btn btn-primary w-full">Book Now</button>
            </div>
          </div>
        </div>
      );
}
