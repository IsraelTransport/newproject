const express = require('express');
const router = express.Router();

const vehiclesRoutes = require('./vehicles/vehicles.routes');
const usersRoutes = require('./Users/User.Routes');
const tripsRoutes = require('./Trips/Trips.Routes');
const bookingTypesRoutes = require('./BookingTypes/BookingTypes.Routes'); 
const bookingsRoutes = require('./Bookings/Bookings.Routes');
const userTypesRoutes = require('./UserTypes/UserTypes.Routes');
const reportsRoutes = require('./Reports/Report.Routes'); 
const driverRoutes = require('./Drivers/Drivers.Routes');


router.use('/vehicles', vehiclesRoutes);
router.use('/users', usersRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/bookingtypes', bookingTypesRoutes);
router.use('/trips', tripsRoutes); 
router.use('/usertypes', userTypesRoutes);
router.use('/reports', reportsRoutes); 
router.use('/drivers', driverRoutes)
module.exports = router;
