const express = require('express');
const { getTrips, getTrip, createTrip, deleteAllTrips , getTripIDByName, updateTrip, deleteTrip } = require('./Trips.Controller');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Temporary storage for uploaded files

router.get('/GetAllTrips', getTrips);
router.get('/GetTrip/:id', getTrip);
router.get('/GetTripIDByName/:name', getTripIDByName); 
router.put('/UpdateTrip/:id', updateTrip);
router.delete('/DeleteTrip/:id', deleteTrip);
router.delete('/DeleteAllTrips', deleteAllTrips );  
router.post('/CreateTrip', upload.single('image'), createTrip);  // Add multer middleware for image uploads

module.exports = router;
