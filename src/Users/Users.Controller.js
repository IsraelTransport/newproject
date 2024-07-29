const bcrypt = require('bcryptjs');
const User = require('./User.Model');

const userTypeMap = {
    1: 'admin',
    2: 'client',
    3: 'driver'
};

async function checkUserCredentials(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const { _id, fullName, email, userType } = user;
            res.status(200).send({
                message: 'User authenticated successfully',
                user: { _id, fullName, username, email, userType }
            });
        } else {
            res.status(401).send({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error checking user credentials:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

async function listAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error listing all users:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

async function createUser(req, res) {
    const { fullName, username, email, password, userTypeID } = req.body;

    if (!fullName || !username || !email || !password || userTypeID === undefined) {
        return res.status(400).send({ error: 'Full name, username, email, password, and user type are required' });
    }

    if (![1, 2, 3].includes(userTypeID)) {
        return res.status(400).send({ error: 'User type must be 1, 2, or 3' });
    }

    try {
        const lastUser = await User.findOne().sort({ userID: -1 });
        const newUserID = lastUser ? lastUser.userID + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            fullName, 
            username, 
            email, 
            password: hashedPassword, 
            userID: newUserID,
            userTypeID: userTypeID,
            userType: userTypeMap[userTypeID] 
        });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

module.exports = { checkUserCredentials, listAllUsers, createUser };
