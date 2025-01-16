import express from "express"
const app = express()
import dotenv from "dotenv"
import { connectDB } from "./src/lib/db.js"
import authRoutes from "./src/routes/auth.route.js"
import cors from "cors"
app.use(cors());

dotenv.config()
app.use(express.json())
const PORT = process.env.PORT
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log("Listening Port ", PORT);
})