const mongoose = require('mongoose');

const ReadyTripSchema = new mongoose.Schema({
    TripID: { type: Number, required: true, unique: true },
    BookingTypeName: { type: String, required: true },
    Destination: { type: String, required: true },
    DepartureTime: { type: Date, required: true },
    AvailableSeats: { type: Number, required: true },
    vehicleType: { type: String, required: true, enum: ['Bus', 'MiniBus', 'Taxi'] },
    carName: { type: String, required: true }, // New field
    passengers: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('ReadyTrip', ReadyTripSchema);
