import express from "express"
import { getHotels, getHotelByID, getRooms } from "../controllers/hotel.controller.js"
const router = express()

router.post("/get-hotels", getHotels)
router.post("/get-hotel", getHotelByID)
router.get("/get-rooms", getRooms)
export default router

