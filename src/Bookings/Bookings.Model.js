const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        required: true
    },
    BookingTypeID: {
        type: Number,
        required: true
    },
    TripID: {
        type: Number,
        required: true
    },
    BookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected'] // Valid statuses
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
