const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },  
    count: { type: Number, required: true } 
});

// Export the Counter model
module.exports = mongoose.model('Counter', CounterSchema, 'Counters');
