import Booking from "../model/booking.model.js";
export const getBooking = async (req, res) => {
    try {
        const user = req.user
        const bookings = await Booking.find({ user_id: user._id })
        console.log("Bookings  :", bookings);
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

export const createBooking = async (req, res) => {
    try {
        const { user_id, hotelID, roomID, arrivalDate, departureDate } = req.body
        if (!user_id || !hotelID || !roomID || !arrivalDate || !departureDate) {
            return res.status(400).json({
                message: "Invalid Details!"
            })
        }
        const ad = new Date(arrivalDate)
        const dd = new Date(departureDate)
        const booking = await new Booking({
            user_id, hotelID, roomID, arrivalDate: ad, departureDate: dd, status: "Confirmed"
        })
        await booking.save()
        console.log("Here");
        if (!booking) {
            return res.status(400).json({
                message: "Booking Failed Internal Error!"
            })
        }
        res.status(201).json({
            user_id: booking.user_id,
            booking_id: booking._id,
            hotelID: booking.hotelID,
            roomID: booking.roomID,
            arrivalDate: booking.arrivalDate,
            departureDate: booking.departureDate,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"

        })
    }
}
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                message: "Incorrect ID"
            })
        }
        const deletedBookings = await Booking.findByIdAndDelete(id);
        if (!deletedBookings)
            return res.status(400).json({ message: "Booking not found" });
        res.status(200).json(deleteBooking);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}