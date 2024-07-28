const express = require('express');
const { getTrips, createTrip, updateTrip, deleteTrip } = require('./Trips.Controller');
const router = express.Router();

router.get('/', getTrips);
router.post('/create', createTrip);
router.put('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);

module.exports = router;
