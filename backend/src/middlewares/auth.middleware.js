import jwt from "jsonwebtoken"
import User from "../model/user.model.js";
import Booking from "../model/booking.model.js";
export const protectRoute = async (req, res, next) => {
    try {
        console.log("In the protected route function");
        const token = req.cookies.jwt
        console.log("Token : ", token);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access-No Token!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("Decoded :", decoded);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized Token-Invalid!"
            })
        }
        const user = await User.findById(decoded.userID).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "No User!"
            })
        }
        console.log("User :", user);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal Error!"
        })
    }
}