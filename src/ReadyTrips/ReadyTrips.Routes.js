const express = require('express');
const { getReadyTrips, createReadyTrip, getReadyTrip, updateReadyTrip, deleteReadyTrip } = require('./ReadyTrips.Controller');
const router = express.Router();

router.get('/GetAllReadyTrips', getReadyTrips);
router.post('/CreateReadyTrip', createReadyTrip);
router.get('/GetReadyTrip/:id', getReadyTrip);
router.put('/UpdateReadyTrip/:id', updateReadyTrip);
router.delete('/DeleteReadyTrip/:id', deleteReadyTrip);

module.exports = router;
