const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    BookingID: { type: Number, required: true, unique: true },
    UserID: { type: Number, required: true },
    VehicleID: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Pending', 'Confirmed', 'Cancelled'] },
    DepartureTime: { type: Date, required: true },
    Passengers: { type: Number, required: true },
    PickupAddress: { type: String, required: true },
    DropOffAddress: { type: String, required: true },
    FullName: { type: String, required: true },
    Email: { type: String, required: true },
    PhoneNumber: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Booking', BookingSchema, 'Bookings');
