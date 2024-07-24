const express = require('express');
const router = express.Router();
const { getBookings, createBooking } = require('./Bookings.Controller'); // Ensure this matches the file name exactly

router.get('/', getBookings);
router.post('/', createBooking);

module.exports = router;
