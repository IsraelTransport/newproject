const express = require('express');
const { getTrips, getTrip, createTrip, deleteAllTrips , getTripIDByName, updateTrip, deleteTrip } = require('./Trips.Controller');
const router = express.Router();

router.get('/GetAllTrips', getTrips);
router.post('/CreateTrip', createTrip);
router.get('/GetTrip/:id', getTrip);
router.get('/GetTripIDByName/:name', getTripIDByName); 
router.put('/UpdateTrip/:id', updateTrip);
router.delete('/DeleteTrip/:id', deleteTrip);
router.delete('/DeleteAllTrips', deleteAllTrips );  

module.exports = router;
