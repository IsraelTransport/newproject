const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    VehicleID: { type: Number, required: true, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    km: { type: Number, required: true },
    vehicleType: { type: String, required: true, enum: ['Bus', 'MiniBus', 'Taxi'] }
}, { versionKey: false });

module.exports = mongoose.model('Vehicle', VehicleSchema);
