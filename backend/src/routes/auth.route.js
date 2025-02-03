import express from "express"
import { login, logout, signup, profile , checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", protectRoute, profile)
router.get("/check", protectRoute, checkAuth)
export default router