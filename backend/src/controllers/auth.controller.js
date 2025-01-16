import bcrypt from "bcryptjs"
import User from "../model/user.model.js";
import { generateToken } from "../lib/utils.js";


export const signup = async (req, res) => {
    try {
        const { email, username, password, mobileNumber } = req.body
        if (!email || !username || !password || !mobileNumber) {
            return res.status(400).json({
                message: "Invalid Credentials!"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username: username,
            email: email,
            mobileNumber: mobileNumber,
            password: hashedPassword
        })
        await newUser.save()
        console.log(newUser);
        if (!newUser) {
            return res.status(400).json({
                message: "Invalid User Data"
            })
        }
        const token = generateToken(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            mobileNumber: newUser.mobileNumber, token
        })
    } catch (error) {
        console.log("Signup Er  ror :", error);
        res.status(400).json({
            message: "Signup Error"
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid Credentials!"
            })
        }
        const user = await User.findOne({ email });
        if (!user || ! await bcrypt.compare(password, user.password)) {
            return res.status(!user ? 404 : 400).json({
                message: (!user) ? "User 404" : "Invalid Credentials!"
            })
        }
        const token = await generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            mobileNumber: user.mobileNumber, token
        })
    } catch (error) {
        res.status(400).json({
            message: "Login Error"
        })
    }
    console.log("Login Succesfull! ", req.user);
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({
            message: "Logout Successful!"
        });
    } catch (error) {
        res.status(400).json({
            message: "Logout Error"
        })
    }
    console.log("Logout Succesfull!");
}
