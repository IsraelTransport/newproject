require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const routes = require('./src');
const cron = require('node-cron');
const { sendTripReminders } = require('./src/Trips/Trips.Controller');

const PORT = process.env.PORT || 5005;
const server = express();

server.use(express.json());
server.use(cors());
server.use('/api', routes);

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Schedule the reminder function to run every day at 8 AM
cron.schedule('0 8 * * *', () => {
    console.log("Running daily trip reminder check...");
    sendTripReminders();
});

// Start the server
server.listen(PORT, () => console.log(`[SERVER] http://localhost:${PORT}`));
