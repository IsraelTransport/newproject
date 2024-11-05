const Schedule = require('./Schedule.Model');

async function createScheduleInDB(scheduleData) {
    try {
        const newSchedule = new Schedule(scheduleData);
        return await newSchedule.save();  
    } catch (error) {
        throw error;
    }
}

async function getSchedulesFromDB() {
    try {
        return await Schedule.find(); 
    } catch (error) {
        throw error;
    }
}

async function getScheduleByIDFromDB(id) {
    try {
        return await Schedule.findOne({ scheduleID: id });
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

async function updateScheduleInDB(id, updateData) {
    try {
        return await Schedule.updateOne({ scheduleID: id }, { $set: updateData });  
    } catch (error) {
        throw error;
    }
}

async function deleteScheduleFromDB(id) {
    try {
        return await Schedule.deleteOne({ scheduleID: id });  
    } catch (error) {
        throw error;
    }
}

module.exports = { createScheduleInDB, getScheduleByUserIDFromDB, getSchedulesFromDB, getScheduleByIDFromDB, updateScheduleInDB, deleteScheduleFromDB };
