const mongoose = require('mongoose');
const Booking = require('./Bookings.Model'); // Ensure this matches the file name exactly

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function getBookingsFromDB() {
    try {
        return await Booking.find().exec();
    } catch (error) {
        throw error;
    }
}

async function createBookingInDB(bookingData) {
    try {
        const booking = new Booking(bookingData);
        return await booking.save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getBookingsFromDB,
    createBookingInDB
};
