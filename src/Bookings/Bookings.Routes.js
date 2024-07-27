const express = require('express');
const {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require('./Bookings.Controller');

const router = express.Router();

router.get('/GetAllBookings', getBookings);

router.post('/CreateBooking', createBooking);

router.get('/GetBooking/:id', getBooking);

router.put('/UpdateBooking/:id', updateBooking);

router.delete('/DeleteBooking/:id', deleteBooking);

module.exports = router;
