const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequenceValue: { type: Number, required: true }
}, { versionKey: false });

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
