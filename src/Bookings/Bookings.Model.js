const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    BookingID: { type: Number, required: true, unique: true },
    BookingName: { type: String, required: true },
    BookingType: { type: String, required: true },
    OpenHour: { type: String, required: true },
    CloseHour: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Booking', BookingSchema);
