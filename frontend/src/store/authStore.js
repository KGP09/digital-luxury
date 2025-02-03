import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast';
export const useAuthStore = create((set, get) => ({
    authUser: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("RES: ", res);
            set({ authUser: res.data });
        } catch (error) {
            console.log(error);
            set({ authUser: null });
        }
    },
    login: async (data) => {
        try {
            console.log(data);
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login Succesfull!")
            return true
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            return false;
        }
    },
    signup: async (data) => {
        try {
            console.log(data);
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Signup Succesfull!")
            return true
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            return false;
        }
    },
    logout: async () => {
        try {
            console.log();
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            return false;
        }
    },

}))