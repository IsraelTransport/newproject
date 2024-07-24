const Router = require('express').Router;
const { getAllVehicles } = require('./vehicles.controller');

const vehiclesRouter = Router();

vehiclesRouter
    .get('/', getAllVehicles);

module.exports = vehiclesRouter
