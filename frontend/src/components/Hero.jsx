import React, { useState } from "react";
import { useHotelStore } from "../store/hotelStore";
import {useAuthStore} from "../store/authStore"
import { useNavigate } from "react-router-dom";
import HotelLoading from "../skeleton/HotelLoading";

export default function Hero() {
  const [dest, setDestination] = useState("");
  const [ad, setAD] = useState("");
  const [dd, setDD] = useState("");
  const {getHotels } = useHotelStore()
  const {authUser} = useAuthStore();
  const navigate = useNavigate();
  const {city_code , hotels_of_city} = useHotelStore()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if(!authUser){
      navigate("/login");
      return
    }

    console.log("Destination:", dest, "Arrival Date:", ad, "Departure Date:", dd);
    const res = await getHotels({ city: dest, arrival_date: ad ,departure_date: dd})  
    console.log( "RES: " ,(res));
    if(res) navigate(`/hotels/${res.city_code}`)
  }
  return (
    <div className="z-[-1px] relative h-screen flex items-center justify-center">
      {/* Background Image with Gradient Container */}
      <div className="absolute top-0 left-0 w-full h-screen">
        <img
          src="/herophoto.jpg"
          alt="Image not found"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-20 text-center">
        {/* Form */}
        <form className="mt-[-90px]">
          <input
            type="text"
            placeholder="Enter destination"
            value={dest}
            onChange={(e) => setDestination(e.target.value)}
            className="text-xl input input-bordered w-96 text-center bg-white text-gray-800 shadow-md"
          />

          <div className="flex justify-center gap-6 mt-4 relative">
            {/* Arrival Date Input */}
            <div className="relative group w-48">
              <input
                type="date"
                value={ad}
                onChange={(e) => setAD(e.target.value)}
                className="text-1xl input input-bordered w-full text-center bg-white text-gray-800 shadow-md"
              />
            </div>

            {/* Departure Date Input */}
            <div className="relative group w-48">
              <input
                type="date"
                value={dd}
                onChange={(e) => setDD(e.target.value)}
                className="input input-bordered w-full text-center bg-white text-gray-800 shadow-md"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="text-white btn glass mt-6 hover:bg-slate-250 hover:text-black"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
