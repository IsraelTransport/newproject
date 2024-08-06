const bcrypt = require('bcryptjs');
const { getUserByUsername, getUserByIDInDB, updateUserInDB , deleteUserFromDB, getUsersFromDB, createUserInDB } = require('./Users.db');
const User = require('./User.Model');
const {getNextSequenceValue} = require('../counters.db')
const userTypeMap = {
    1: 'admin',
    2: 'client',
    3: 'driver'
};
async function GetUserByID(req, res){
    const { userID } = req.params; 

    try {
        const user = await getUserByIDInDB(userID);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

async function getUserIDByUsername(req, res) {
    const { username } = req.params;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ userID: user.userID });
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}


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
    const { fullName, username, email, password, language, country, city, userTypeID } = req.body;

    if (!fullName || !username || !email || !password || !language || !country || !city || userTypeID === undefined) {
        return res.status(400).send({ error: 'Full name, username, email, password, language, country, city, and user type are required' });
    }

    if (![1, 2, 3].includes(userTypeID)) {
        return res.status(400).send({ error: 'User type must be 1, 2, or 3' });
    }

    try {
        const userID = await getNextSequenceValue('Users'); 

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            fullName,
            username,
            email,
            password: hashedPassword,
            language,
            country,
            city,
            userID,
            userTypeID,
        };
        await createUserInDB(user);
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}


async function deleteUser(req, res) {
    const { userID } = req.params;

    try {
        const result = await deleteUserFromDB(userID);
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'User deleted successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

async function editUser(req, res) {
    const { userID } = req.params;
    const { fullName, username, email, password, language, country, city, userTypeID, drivingLicense } = req.body;

    if (!fullName || !username || !email || !password || !language || !country || !city || userTypeID === undefined) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = {
            fullName,
            username,
            email,
            password: hashedPassword,
            language,
            country,
            city,
            userTypeID,
            userType: userTypeMap[userTypeID],
            drivingLicense
        };
        const result = await updateUserInDB(userID, updatedUser);
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'User updated successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}

module.exports = { checkUserCredentials, getUserIDByUsername, editUser ,deleteUser, listAllUsers, createUser, GetUserByID };
