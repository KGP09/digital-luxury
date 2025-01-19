import express from "express"
import { login, logout, signup, profile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", protectRoute, profile)
export default router