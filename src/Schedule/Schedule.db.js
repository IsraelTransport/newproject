const Schedule = require('./Schedule.Model');

// Create schedule
async function createScheduleInDB(scheduleData) {
    try {
        const newSchedule = new Schedule(scheduleData);
        return await newSchedule.save();  // Save the schedule document to MongoDB
    } catch (error) {
        throw error;
    }
}

// Get all schedules
async function getSchedulesFromDB() {
    try {
        return await Schedule.find();  // Retrieve all documents in the Schedule collection
    } catch (error) {
        throw error;
    }
}

// Get schedule by ID
async function getScheduleByIDFromDB(id) {
    try {
        return await Schedule.findOne({ scheduleID: id });  // Find the schedule by scheduleID
    } catch (error) {
        throw error;
    }
}

async function getScheduleByUserIDFromDB(userID) {
    try {
        const schedules = await Schedule.find({ userID: parseInt(userID) });
        return schedules;
    } catch (error) {
        console.error('Error fetching schedules by user ID from DB:', error);
        throw error;
    }
}

// Update schedule
async function updateScheduleInDB(id, updateData) {
    try {
        return await Schedule.updateOne({ scheduleID: id }, { $set: updateData });  // Update the document
    } catch (error) {
        throw error;
    }
}

// Delete schedule
async function deleteScheduleFromDB(id) {
    try {
        return await Schedule.deleteOne({ scheduleID: id });  // Delete the schedule by scheduleID
    } catch (error) {
        throw error;
    }
}

module.exports = { createScheduleInDB, getScheduleByUserIDFromDB, getSchedulesFromDB, getScheduleByIDFromDB, updateScheduleInDB, deleteScheduleFromDB };
