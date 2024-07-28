const express = require('express');
const { getVehicles, createVehicle, updateVehicle, deleteVehicle } = require('./vehicles.controller');
const router = express.Router();

router.get('/GetAllVehicles', getVehicles);
router.post('/CreateVehicle', createVehicle);
router.put('/UpdateVehicle/:id', updateVehicle);
router.delete('/DeleteVehicle/:id', deleteVehicle);

module.exports = router;
