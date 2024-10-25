const { 
    getVehiclesFromDB, 
    getVehicleByID, 
    createVehicleInDB, 
    updateVehicleInDB, 
    deleteVehicleFromDB 
} = require('./vehicles.db');
const Vehicle = require('./vehicles.model');
const { getNextSequenceValue } = require('../Counters/CounterService');
async function getVehicles(req, res) {
    try {
        const vehicles = await getVehiclesFromDB();
        res.status(200).send(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getVehicle(req, res) {
    const { id } = req.params;
    try {
        const vehicle = await getVehicleByID(id);
        if (vehicle) {
            res.status(200).send(vehicle);
        } else {
            res.status(404).send({ error: 'Vehicle not found' });
        }
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function createVehicle(req, res) {
    const { Make, Model, Year, Km, vehicleType, carPlateNumber } = req.body;
    if (!Make || !Model || !Year || !Km || !vehicleType || !carPlateNumber) {
        return res.status(400).send({ error: 'All vehicle details are required' });
    }

    try {
        const VehicleID = await getNextSequenceValue('Vehicles'); 
        const newVehicle = new Vehicle({ VehicleID, Make, Model, Year, Km, vehicleType, carPlateNumber });
        await createVehicleInDB(newVehicle);
        res.status(201).send({ message: 'Vehicle created successfully' });
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}


async function updateVehicle(req, res) {
    const { id } = req.params;
    const vehicleData = req.body;

    try {
        const result = await updateVehicleInDB(id, vehicleData);
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Vehicle updated successfully' });
        } else {
            res.status(404).send({ error: 'Vehicle not found' });
        }
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function deleteVehicle(req, res) {
    const { id } = req.params;

    try {
        const result = await deleteVehicleFromDB(id);
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'Vehicle deleted successfully' });
        } else {
            res.status(404).send({ error: 'Vehicle not found' });
        }
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };
