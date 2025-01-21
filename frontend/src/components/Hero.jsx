import React, { useState } from 'react';

export default function Hero() {
  const[dest , setDestination] = useState('')
  const[ad , setAD ] = useState('')
  const[dd , setDD ] = useState('')
  console.log(dest , ad , dd);
  return (
    <div className=" z-[-1px] relative h-screen flex items-center justify-center">
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
        {/* Inputs */}
        <div className="mt-[-90px] "> {/* Adjust the margin-top value to push content upwards */}
          <input
            type="text"
            placeholder="Enter destination"
            onChange={(e)=> setDestination(e.target.value)}
            className="text-xl input input-bordered w-96 text-center bg-white text-gray-800 shadow-md"
          />
          <div className=" flex justify-center gap-6 mt-4 relative">
            {/* Arrival Date Input */}
            <div className="relative group w-48">
              <input
                type="date"
                onChange={(e)=> setAD(e.target.value)}

                className=" text-1xl input input-bordered w-full text-center bg-white text-gray-800 shadow-md"
              />
            </div>
            {/* Departure Date Input */}
            <div className="relative group w-48">
              <input
                type="date"
                onChange={(e)=> setDD(e.target.value)}

                className="input input-bordered w-full text-center bg-white text-gray-800 shadow-md"
              />
            </div>
          </div>

          <button className="text-white btn glass  mt-6  hover:bg-slate-250  hover:text-black">Search</button>
        </div>
      </div>
    </div>
  );
}
