import { create } from 'zustand'
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axios'
export const useHotelStore = create((set, get) => ({
    getHotels: async (data) => {
        try {
            // const res =
            console.log("DATA: ", data);
            const res = await axiosInstance.post("/hotels/get-hotels", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    },
}))