require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5005;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api', routes);

server.listen(PORT, () => console.log(`[SERVER] http://localhost:${PORT}`));
