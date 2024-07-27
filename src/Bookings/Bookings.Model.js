const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    BookingID: { type: Number, required: true, unique: true },
    UserID: { type: Number, required: true },
    BookingTypeID: { type: Number, required: true },
    TripID: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Pending', 'Confirmed', 'Cancelled'] }
}, { versionKey: false });

module.exports = mongoose.model('Booking', BookingSchema);
