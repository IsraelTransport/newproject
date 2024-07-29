const express = require('express');
const { getTrips, getTrip, createTrip, updateTrip, deleteTrip } = require('./Trips.Controller');
const router = express.Router();

router.get('/GetAllTrips', getTrips);
router.post('/CreateTrip', createTrip);
router.get('/GetTrip/:id', getTrip);
router.put('/UpdateTrip/:id', updateTrip);
router.delete('/DeleteTrip/:id', deleteTrip);

module.exports = router;
