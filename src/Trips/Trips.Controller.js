const { getNextSequenceValue } = require('../Counters/CounterService');
const { createTripInDB, getTripsFromDB, deleteAllTripsFromDB, getTripIDByNameFromDB, getTripByIDFromDB, updateTripInDB, deleteTripFromDB } = require('./Trips.db');
const Trip = require('./Trips.Model');
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/du0byjmkm/image/upload/v1730665167/Trips/';
const { sendEmail } = require('../EmailVerifying/email');
const moment = require('moment');

async function getTrips(req, res) {
    try {
        const trips = await getTripsFromDB();
        res.status(200).send(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
async function sendTripReminders() {
    const tomorrow = moment().add(1, 'day').startOf('day');
    const dayAfterTomorrow = moment().add(2, 'day').startOf('day');

    try {
        const trips = await Trip.find({
            Date: { $gte: tomorrow.toDate(), $lt: dayAfterTomorrow.toDate() },
            ReminderSent: false
        });

        for (const trip of trips) {
            const subject = `Reminder: Upcoming Trip - ${trip.TripName}`;
            const htmlContent = `<p>This is a reminder for your upcoming trip to ${trip.TripName} on ${moment(trip.Date).format("MMMM Do YYYY, h:mm a")}.</p>`;
            const userEmail = 'user@example.com'; // Replace this with actual user email logic

            await sendEmail(userEmail, subject, htmlContent);

            trip.ReminderSent = true;
            await trip.save();
        }
        
        console.log("Reminders sent for trips scheduled for tomorrow.");
    } catch (error) {
        console.error("Error sending trip reminders:", error);
    }
}
async function getTrip(req, res) {
    const { id } = req.params;
    try {
        const trip = await getTripByIDFromDB(id);
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
    let { TripName, TripType, OpenHour, CloseHour, Description } = req.body;
    let imageURL = `${CLOUDINARY_BASE_URL}${TripName}`;
    if (!TripName || !TripType || !Description) {
        return res.status(400).send({ error: 'TripName, TripType, and Description are required' });
    }

    OpenHour = OpenHour || [];
    CloseHour = CloseHour || [];

    if (OpenHour.length === 0 && CloseHour.length === 0) {
        OpenHour = Array(7).fill("00:00");
        CloseHour = Array(7).fill("23:59");

    } else if (OpenHour.length < 7) {
        OpenHour = OpenHour.concat(Array(7 - OpenHour.length).fill("Closed"));
        CloseHour = CloseHour.concat(Array(7 - CloseHour.length).fill("Closed"));
    }

    try {
        const TripID = await getNextSequenceValue('Trips');
    
        const newTrip = { TripID, TripName, TripType, OpenHour, CloseHour, Description, ImageURL: imageURL };
        await createTripInDB(newTrip);
        res.status(201).send({ message: 'Trip created successfully', tripId: TripID });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}


async function getTripIDByName(req, res) {
    const { name } = req.params;
    try {
        const trip = await getTripIDByNameFromDB(name);
        if (trip) {
            res.status(200).send(trip);
        } else {
            res.status(404).send({ error: 'Trip not found' });
        }
    } catch (error) {
        console.error('Error fetching trip by name:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function updateTrip(req, res) {
    const { id } = req.params;
    let { TripName, TripType, OpenHour = [], CloseHour = [], Description } = req.body;

    try {
        const existingTrip = await getTripByIDFromDB(id);

        if (!existingTrip) {
            return res.status(404).send({ error: 'Trip not found' });
        }

        if (OpenHour.length === 0 && CloseHour.length === 0) {
            OpenHour = Array(7).fill("00:00");
            CloseHour = Array(7).fill("23:59");
        } else if (OpenHour.length < 7 || CloseHour.length < 7) {
            OpenHour = OpenHour.concat(Array(7 - OpenHour.length).fill("Closed"));
            CloseHour = CloseHour.concat(Array(7 - CloseHour.length).fill("Closed"));
        }

        const updatedTrip = {
            TripName: TripName || existingTrip.TripName,
            TripType: TripType || existingTrip.TripType,
            OpenHour: OpenHour.length ? OpenHour : existingTrip.OpenHour,
            CloseHour: CloseHour.length ? CloseHour : existingTrip.CloseHour,
            Description: Description || existingTrip.Description
        };

        await updateTripInDB(id, updatedTrip);
        res.status(200).send({ message: 'Trip updated successfully', updatedTrip });
    } catch (error) {
        console.error('Error updating trip:', error.message);
        res.status(500).send({ error: 'Internal server error', details: error.message });
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
async function deleteAllTrips(req, res) {
    try {
        const result = await deleteAllTripsFromDB();
        res.status(200).send({ message: 'All trips deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting all trips:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getTrips, getTrip, deleteAllTrips ,sendTripReminders, getTripIDByName, createTrip, updateTrip, deleteTrip };
