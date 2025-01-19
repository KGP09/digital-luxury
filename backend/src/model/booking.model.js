import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        hotelID: {
            type: String,
            required: true,
        },
        roomID: {
            type: String,
            required: true,
        },
        arrivalDate: {
            type: Date,
            required: true,
        },
        departureDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
