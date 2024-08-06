const express = require('express');
const { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } = require('./vehicles.controller');
const router = express.Router();

router.get('/GetAllVehicles', getVehicles);
router.get('/GetVehicle/:id', getVehicle);
router.post('/CreateVehicle', createVehicle);
router.put('/UpdateVehicle/:id', updateVehicle);
router.delete('/DeleteVehicle/:id', deleteVehicle);

module.exports = router;
 