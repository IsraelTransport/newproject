require('dotenv').config();  // Import and configure dotenv
const jwt = require('jsonwebtoken');

function generateVerificationToken(userId) {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { generateVerificationToken };
