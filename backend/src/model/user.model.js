import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: false,
            default: ""
        },
        mobileNumber: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 10
        },
        address: {
            type: String,
            required: false,
            default: ""

        }
    }, { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User