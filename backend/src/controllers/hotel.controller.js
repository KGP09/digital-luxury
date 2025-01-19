import axios from "axios";

export const getHotels = async (req, res) => {
    try {
        const { city, arrival_date, departure_date, adults, room_quantity } = req.body;

        // Validate required fields
        if (!city || !arrival_date || !departure_date) {
            return res.status(400).json({
                message: "Check all fields!",
            });
        }
        console.log(arrival_date + " " + departure_date);
        const code = {
            method: "GET",
            url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
            params: { query: city },
            headers: {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            },
        };

        const cityCode = (await axios.request(code)).data;

        if (!cityCode || !cityCode.data || cityCode.data.length === 0) {
            return res.status(400).json({
                message: "Error fetching city information",
            });
        }

        const id = cityCode.data[0].dest_id;
        console.log("Destination ID:", id);

        const options = {
            method: "GET",
            url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
            params: {
                dest_id: id,
                search_type: "CITY",
                arrival_date: arrival_date,
                departure_date: departure_date,
                adults: adults || "1",
                children_age: "0,17",
                room_qty: room_quantity || "1",
                page_number: "1",
                units: "metric",
                temperature_unit: "c",
                languagecode: "en-us",
                currency_code: "INR",
            },
            headers: {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            },
        };

        const response = (await axios.request(options)).data;
        console.log(response.data.hotels);
        return res.status(200).json(response.data.hotels);
    } catch (error) {
        console.error("GET HOTELS Error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
export const getHotelByID = async (req, res) => {
    try {
        const { hotel_id, arrival_date, departure_date } = req.body;
        if (!hotel_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }
        const res1 = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails',
            params: {
                hotel_id: hotel_id,
                arrival_date: arrival_date,
                departure_date: departure_date,
                adults: '1',
                children_age: '1,17',
                room_qty: '1',
                units: 'metric',
                temperature_unit: 'c',
                languagecode: 'en-us',
                currency_code: 'INR'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        const details = await axios.request(res1);
        const res2 = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelPhotos',
            params: {
                hotel_id: hotel_id
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        const photos = await axios.request(res2);
        const res3 = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getQuestionAndAnswer',
            params: {
                hotel_id: hotel_id,
                languagecode: 'en-us'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        const q_n_a = await axios.request(res3)
        const res4 = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getDescriptionAndInfo',
            params: {
                hotel_id: hotel_id,
                languagecode: 'en-us'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        const desc_info = await axios.request(res4);
        const res5 = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelFacilities',
            params: {
                hotel_id: hotel_id,
                arrival_date: arrival_date,
                departure_date: departure_date,
                languagecode: 'en-us'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        const facilities = await axios.request(res5)
        // console.log(details.data, "\n", photos.data, " ", q_n_a.data, '  ', desc_info.data, "  ", facilities.data);
        res.status(200).json({
            details: details.data,
            photos: photos.data,
            q_n_a: q_n_a.data,
            desc_info: desc_info.data,
            facilities: facilities.data
        });

    } catch (error) {
        console.log("Error in getting Details");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getRooms = async (req, res) => {
    try {
        const { hotel_id, arrival_date, departure_date, room_id } = req.body
        if (!hotel_id || !arrival_date || !departure_date) return res.status(400).json({ message: "Invalid Request" })
        const res1 = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getRoomList',
            params: {
                hotel_id: hotel_id,
                arrival_date: arrival_date,
                departure_date: departure_date,
                adults: '1',
                children_age: '1,0',
                room_qty: '1',
                units: 'metric',
                temperature_unit: 'c',
                languagecode: 'en-us',
                currency_code: 'INR'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        }
        const rooms = await axios.request(res1)
        if (!room_id) res.status(200).json(rooms.data)
        const roomDetails = rooms.data.data.rooms[room_id];
        // console.log(roomDetails);
        res.status(200).json({
            roomDetails
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}