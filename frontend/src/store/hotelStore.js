import { create } from 'zustand'
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axios'
export const useHotelStore = create((set, get) => ({
    city_code: null,
    hotel_code: null,
    arrival_date: null,
    departure_date: null,
    hotels_of_city: null,
    rooms_of_hotel: null,
    isGettingHotels: false,
    getHotels: async (data) => {
        set({ isGettingHotels: true })
        try {
            console.log("DATA: ", data);
            set({ arrival_date: data.arrival_date })
            set({ departure_date: data.departure_date })
            const res = await axiosInstance.post("/hotels/get-hotels", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            set({ city_code: res.data.city_code })
            set({ hotels_of_city: res.data.hotels })
            console.log("RES: ", res);
            set({ isGettingHotels: false })
            return res.data
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    },
    getRooms: async (data) => {
        try {
            console.log("DATA: ", data);
            const res = await axiosInstance.post("/hotels/get-hotel", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // set({ hotel_code: res.data })
            // set({ rooms_of_hotel: res.data })
            console.log("GET ROOMS RES: ", res.data.details);
            return res.data
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
}))