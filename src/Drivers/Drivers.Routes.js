const express = require('express');
const { getDrivers, getDriverByID, getDriverIDByName, createDriver, updateDriver, deleteDriver } = require('./Drivers.Controller');
const router = express.Router();

router.get('/GetAllDrivers', getDrivers);
router.post('/CreateDriver', createDriver);
router.get('/GetDriver/:id', getDriverByID);
router.put('/UpdateDriver/:id', updateDriver);
router.delete('/DeleteDriver/:id', deleteDriver);
router.get('/GetDriverIDByName/:name', getDriverIDByName);

module.exports = router;
