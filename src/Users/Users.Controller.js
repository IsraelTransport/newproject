const bcrypt = require('bcryptjs');
const { getUserByUsername, getUsersFromDB, getLastUserID, createUserInDB } = require('./Users.db');
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
        const user = await getUserByUsername(username);
        if (!user) {
            console.log('User not found');
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        const { userID, fullName, email, userType } = user;
        res.status(200).send({
            message: 'User authenticated successfully',
            user: { userID, fullName, username, email, userType }
        });
    } catch (error) {
        console.error('Error checking user credentials:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}


async function listAllUsers(req, res) {
    try {
        const users = await getUsersFromDB();
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
        const lastUser = await getLastUserID();
        const newUserID = lastUser ? lastUser.userID + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            fullName,
            username,
            email,
            password: hashedPassword,
            userID: newUserID,
            userTypeID: userTypeID,
            userType: userTypeMap[userTypeID]
        };
        await createUserInDB(user);
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

module.exports = { checkUserCredentials, listAllUsers, createUser };
