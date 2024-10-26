const { getNextSequenceValue } = require('../Counters/CounterService'); // for auto-incremented IDs
const { createScheduleInDB, getSchedulesFromDB, getScheduleByIDFromDB, updateScheduleInDB, deleteScheduleFromDB } = require('./Schedule.db');
const Schedule = require('./Schedule.Model');

// Create a new schedule
async function createSchedule(req, res) {
    const { assignedDate, tripID, driverID } = req.body;

    if (!assignedDate || !tripID || !driverID) {
        return res.status(400).send({ error: 'Assigned date, tripID, and driverID are required.' });
    }

    try {
        const scheduleID = await getNextSequenceValue('Schedules');
        const newSchedule = new Schedule({
            scheduleID,
            assignedDate, // Use assignedDate here
            tripID,
            driverID
        });

        await createScheduleInDB(newSchedule);
        res.status(201).send({ message: 'Schedule created successfully' });
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}


// Get all schedules
async function getSchedules(req, res) {
    try {
        const schedules = await getSchedulesFromDB();
        res.status(200).send(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

// Get a specific schedule by ID
async function getScheduleByID(req, res) {
    const { id } = req.params;

    try {
        const schedule = await getScheduleByIDFromDB(id);
        if (schedule) {
            res.status(200).send(schedule);
        } else {
            res.status(404).send({ error: 'Schedule not found' });
        }
    } catch (error) {
        console.error('Error fetching schedule by ID:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getScheduleByUserID(req, res) {
    const { userID } = req.params;

    try {
        const schedules = await Schedule.find({ userID: parseInt(userID) });
        if (schedules.length > 0) {
            res.status(200).send(schedules);
        } else {
            res.status(404).send({ error: 'No schedules found for the specified user ID' });
        }
    } catch (error) {
        console.error('Error fetching schedules by user ID:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}
// Update a schedule
async function updateSchedule(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const result = await updateScheduleInDB(id, updateData);
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Schedule updated successfully' });
        } else {
            res.status(404).send({ error: 'Schedule not found' });
        }
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

// Delete a schedule
async function deleteSchedule(req, res) {
    const { id } = req.params;

    try {
        const result = await deleteScheduleFromDB(id);
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'Schedule deleted successfully' });
        } else {
            res.status(404).send({ error: 'Schedule not found' });
        }
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { createSchedule, getScheduleByUserID, getSchedules, getScheduleByID, updateSchedule, deleteSchedule };