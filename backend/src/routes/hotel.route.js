import express from "express"
import { getHotels, getHotelByID, getRooms } from "../controllers/hotel.controller.js"
const router = express()

router.get("/get-hotels", getHotels)
router.get("/get-hotel", getHotelByID)
router.get("/get-rooms", getRooms)
export default router