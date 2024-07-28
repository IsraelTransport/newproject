const { getNextSequenceValue } = require('../counters.db');
const { createReadyTripInDB, getTripsFromDB, getTripByID, updateReadyTripInDB, deleteReadyTripFromDB } = require('./Trips.db');
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

async function createTrip(req, res) {
    const { BookingID, UserID, status, DepartureTime, AvailableSeats, Passengers, VehicleID } = req.body;

    if (!BookingID || !UserID || !status || !DepartureTime || !AvailableSeats || !Passengers || !VehicleID) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const tripID = await getNextSequenceValue('Trips');
        const newTrip = { TripID: tripID, BookingID, UserID, status, DepartureTime, AvailableSeats, Passengers, VehicleID };
        await createReadyTripInDB(newTrip);
        res.status(201).send({ message: 'Trip created successfully' });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function updateTrip(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).send({ error: 'Status is required' });
    }

    try {
        const updatedTrip = await updateReadyTripInDB(id, { status });
        if (updatedTrip.modifiedCount > 0) {
            res.status(200).send({ message: 'Trip updated successfully', trip: updatedTrip });
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
        const deletedTrip = await deleteReadyTripFromDB(id);
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

module.exports = { getTrips, createTrip, updateTrip, deleteTrip };
