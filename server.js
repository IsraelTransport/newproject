require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const routes = require('./src');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5005;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api', routes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

server.listen(PORT, () => console.log(`[SERVER] http://localhost:${PORT}`));
