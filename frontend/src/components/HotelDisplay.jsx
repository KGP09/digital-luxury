/* eslint-disable react/prop-types */
import { useHotelStore } from '../store/hotelStore'
import React, { useState } from 'react';
import { Star, MapPin, Wifi, Coffee, User, Phone, Car, Utensils } from 'lucide-react';
import FAQs from './FAQs';

export default function HotelDisplay() {
  const {hotel_code , rooms_of_hotel} = useHotelStore();
  const [activeTab, setActiveTab] = useState('overview');
  console.log(rooms_of_hotel);
  const hotelData = {

    name: rooms_of_hotel.details.data.hotel_name ,
    rating: 7.3,
    type: rooms_of_hotel.details.data.accommodation_type_name,
    address: rooms_of_hotel.details.data.address ,
    city: rooms_of_hotel.details.data.city ,
    country: rooms_of_hotel.details.data.country_trans,
    faqs : rooms_of_hotel.q_n_a.data.q_and_a_pairs, 
    roomSize: rooms_of_hotel.details.data.average_room_size_for_ufi_m2,
    available: rooms_of_hotel.details.data.available_rooms,
    languages: ["English", "Hindi"],
    amenities: [
      { name: "Free WiFi", icon: Wifi },
      { name: "Free Parking", icon: Car },
      { name: "Restaurant", icon: Utensils },
      { name: "Room Service", icon: Coffee },
      { name: "24/7 Front Desk", icon: User },
      { name: "Phone", icon: Phone },
    ],
    photos : rooms_of_hotel.photos.data,
    price : rooms_of_hotel.details.data.product_price_breakdown.all_inclusive_amount.amount_rounded
  };
  console.log( hotelData.reviewCount);
  const TabButton = ({ name, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium transition-colors duration-200 ${
        isActive 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {name}
    </button>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  <h1 className="text-3xl font-bold mb-2">{hotelData.name}</h1>
  
  {/* Location */}
  <div className="flex items-center gap-2 text-gray-600 mb-4">
    <MapPin className="w-4 h-4" />
    <span>{hotelData.address}, {hotelData.city}, {hotelData.country}</span>
  </div>

  {/* Rating */}
  <div className="flex items-center justify-between p-3 rounded-lg">

    {/* Price Button */}
    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
      {hotelData.price}
    </button>
  </div>
</div>


      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          {['overview', 'amenities', 'photos', 'faqs'].map(tab => (
            <TabButton
              key={tab}
              name={tab.charAt(0).toUpperCase() + tab.slice(1)}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-xl font-semibold mb-6">Property Overview</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Property Type</p>
                    <p className="text-gray-600">{hotelData.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Coffee className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Room Size</p>
                    <p className="text-gray-600">{hotelData.roomSize} m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Wifi className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Languages Spoken</p>
                    <p className="text-gray-600">{hotelData.languages.join(", ")}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-6">Availability</h3>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600 mb-2">{hotelData.available}</p>
                <p className="text-gray-600">Rooms Available</p>
              </div>
            </Card>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === 'amenities' && (
          <Card>
            <h3 className="text-xl font-semibold mb-6">Popular Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotelData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <amenity.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{amenity.name}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotelData.photos.map((photo , index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={photo.url}
                  alt={`Hotel photo`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {
  activeTab === 'faqs' && hotelData.faqs && (
    <Card className="p-4 md:p-6">
      <div className="space-y-4">
        <FAQs faqs={hotelData.faqs} /> 
      </div> 
    </Card>
  )
}

      </div>
    </div>
  );
}
