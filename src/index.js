const express = require('express');
const router = express.Router();

const vehiclesRoutes = require('./vehicles/vehicles.routes');
const usersRoutes = require('./Users/User.Routes');
const bookingsRoutes = require('./Bookings/Bookings.Routes');

router.use('/vehicles', vehiclesRoutes);
router.use('/users', usersRoutes);
router.use('/bookings', bookingsRoutes);
module.exports = router;
