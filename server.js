require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Add Mongoose here
const routes = require('./src');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5005;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api', routes);

// MongoDB connection with custom timeout (increase serverSelectionTimeoutMS)
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Set timeout to 30 seconds (30000ms)
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Start the server
server.listen(PORT, () => console.log(`[SERVER] http://localhost:${PORT}`));
