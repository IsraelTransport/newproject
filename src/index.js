const express = require('express');
const router = express.Router();

const vehiclesRoutes = require('./vehicles/vehicles.routes');
const usersRoutes = require('./Users/User.Routes');
const bookingsRoutes = require('./Bookings/Bookings.Routes');
const bookingTypesRoutes = require('./BookingTypes/BookingTypes.Routes'); 
const readyTripsRoutes = require('./ReadyTrips/ReadyTrips.Routes'); // Changed variable name for consistency
const userTypesRoutes = require('./UserTypes/UserTypes.Routes');

router.use('/vehicles', vehiclesRoutes);
router.use('/users', usersRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/bookingtypes', bookingTypesRoutes);
router.use('/readytrips', readyTripsRoutes); // Added leading slash
router.use('/usertypes', userTypesRoutes);

module.exports = router;
