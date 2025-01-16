import jwt from "jsonwebtoken"
export const generateToken = (userID, res) => {
    const token = jwt.sign({ userID },
        process.env.JWT_SECRET_KEY, {
        expiresIn: "3d"
    })
    res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "developement"
    })
    return token
}