import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getBooking, createBooking, deleteBooking } from "../controllers/booking.controller.js";
const router = express();
router.get("/bookings", protectRoute, getBooking)
router.post("/bookings", protectRoute, createBooking)
router.delete("/bookings", protectRoute, deleteBooking)

export default router