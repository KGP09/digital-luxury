import express from "express"
const app = express()
import dotenv from "dotenv"
import { connectDB } from "./src/lib/db.js"
import authRoutes from "./src/routes/auth.route.js"
import hotelRoutes from "./src/routes/hotel.route.js"
import bookingRoutes from "./src/routes/booking.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
app.use(cors());

dotenv.config()
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT
app.use("/api/auth", authRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/bookings", bookingRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log("Listening Port ", PORT);
})