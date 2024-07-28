const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    TripID: { type: Number, required: true, unique: true },
    BookingID: { type: Number, required: true },
    UserID: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Pending', 'Confirmed', 'Cancelled'] },
    DepartureTime: { type: Date, required: true },
    AvailableSeats: { type: Number, required: true },
    Passengers: { type: Number, required: true },
    VehicleID: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Trip', TripSchema, 'Trips');
