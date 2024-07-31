const { getNextSequenceValue } = require('../counters.db');
const { createTripInDB, getTripsFromDB, getTripByID, updateTripInDB, deleteTripFromDB } = require('./Trips.db');
const Trip = require('./Trips.Model');

async function getTrips(req, res) {
    try {
        const trips = await getTripsFromDB();
        res.status(200).send(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getTrip(req, res) {
    const { id } = req.params;
    try {
        const trip = await getTripByID(id);
        if (trip) {
            res.status(200).send(trip);
        } else {
            res.status(404).send({ error: 'Trip not found' });
        }
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function createTrip(req, res) {
    const { TripName, TripType, OpenHour, CloseHour, Description } = req.body;

    if (!TripName || !TripType || !OpenHour || !CloseHour || !Description) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const TripID = await getNextSequenceValue('Trips'); // Get next sequence value
        const newTrip = { TripID, TripName, TripType, OpenHour, CloseHour, Description };
        await createTripInDB(newTrip);
        res.status(201).send({ message: 'Trip created successfully', tripId: TripID });
    } catch (error) {
        console.error('Error creating trip:', error.message);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}



async function updateTrip(req, res) {
    const { id } = req.params;
    const tripData = req.body;
    try {
        const updatedTrip = await updateTripInDB(id, tripData);
        if (updatedTrip.modifiedCount > 0) {
            res.status(200).send({ message: 'Trip updated successfully' });
        } else {
            res.status(404).send({ error: 'Trip not found' });
        }
    } catch (error) {
        console.error('Error updating trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function deleteTrip(req, res) {
    const { id } = req.params;
    try {
        const deletedTrip = await deleteTripFromDB(id);
        if (deletedTrip.deletedCount > 0) {
            res.status(200).send({ message: 'Trip deleted successfully' });
        } else {
            res.status(404).send({ error: 'Trip not found' });
        }
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getTrips, getTrip, createTrip, updateTrip, deleteTrip };
