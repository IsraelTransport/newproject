const { 
    getReadyTripsFromDB, 
    getReadyTripByID, 
    createReadyTripInDB, 
    updateReadyTripInDB, 
    deleteReadyTripFromDB 
} = require('./ReadyTrips.db');
const ReadyTrip = require('./ReadyTrips.Model');
const Vehicle = require('../vehicles/vehicles.model');

async function getReadyTrips(req, res) {
    try {
        const readyTrips = await getReadyTripsFromDB();
        res.status(200).send(readyTrips);
    } catch (error) {
        console.error('Error fetching ready trips:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getReadyTrip(req, res) {
    const { id } = req.params;
    try {
        const readyTrip = await getReadyTripByID(id);
        if (readyTrip) {
            res.status(200).send(readyTrip);
        } else {
            res.status(404).send({ error: 'Ready trip not found' });
        }
    } catch (error) {
        console.error('Error fetching ready trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function createReadyTrip(req, res) {
    const { TripID, BookingTypeName, Destination, DepartureTime, AvailableSeats, vehicleType, carName, passengers } = req.body;
    if (!TripID || !BookingTypeName || !Destination || !DepartureTime || !AvailableSeats || !vehicleType || !carName || !passengers) {
        return res.status(400).send({ error: 'All trip details are required' });
    }

    try {
        const vehicle = await Vehicle.findOne({ vehicleType });
        if (!vehicle) {
            return res.status(400).send({ error: 'No vehicles available for the selected type' });
        }

        const newReadyTrip = new ReadyTrip({ TripID, BookingTypeName, Destination, DepartureTime, AvailableSeats: vehicle.km >= 4 ? vehicle.km - 1 : vehicle.km, vehicleType, carName, passengers });
        await createReadyTripInDB(newReadyTrip);
        res.status(201).send({ message: 'Ready trip created successfully' });
    } catch (error) {
        console.error('Error creating ready trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function updateReadyTrip(req, res) {
    const { id } = req.params;
    const readyTripData = req.body;

    try {
        const result = await updateReadyTripInDB(id, readyTripData);
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Ready trip updated successfully' });
        } else {
            res.status(404).send({ error: 'Ready trip not found' });
        }
    } catch (error) {
        console.error('Error updating ready trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function deleteReadyTrip(req, res) {
    const { id } = req.params;

    try {
        const result = await deleteReadyTripFromDB(id);
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'Ready trip deleted successfully' });
        } else {
            res.status(404).send({ error: 'Ready trip not found' });
        }
    } catch (error) {
        console.error('Error deleting ready trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getReadyTrips, getReadyTrip, createReadyTrip, updateReadyTrip, deleteReadyTrip };
