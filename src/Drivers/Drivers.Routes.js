const express = require('express');
const { getDrivers, getDriver, createDriver, updateDriver, deleteDriver } = require('./Drivers.Controller');
const router = express.Router();

router.get('/GetAllDrivers', getDrivers);
router.get('/GetDriver/:id', getDriver);
router.post('/CreateDriver', createDriver);
router.put('/UpdateDriver/:id', updateDriver);
router.delete('/DeleteDriver/:id', deleteDriver);

module.exports = router;
