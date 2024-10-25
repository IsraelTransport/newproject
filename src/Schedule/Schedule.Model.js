const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    scheduleID: { type: Number, required: true, unique: true },
    tripID: { type: Number, required: true },
    driverID: { type: Number, required: true },
    assignedDate: { type: Date, required: true }, // Date of the trip
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
}, { versionKey: false });

module.exports = mongoose.model('Schedule', ScheduleSchema);
