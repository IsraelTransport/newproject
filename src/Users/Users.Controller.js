const bcrypt = require('bcryptjs');
const { getUserByUsername,updateUserEmailInDB, getUserByEmail, getUserByIDInDB, updateUserInDB , deleteUserFromDB, getUsersFromDB, createUserInDB } = require('./Users.db');
const User = require('./User.Model');
const {getNextSequenceValue} = require('../../Counter/counters.db')
const userTypeMap = {
    1: 'admin',
    2: 'client',
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
        return res.status(400).send({ error: 'All fields are required' });
    }

    if (![1, 2].includes(userTypeID)) {
        return res.status(400).send({ error: 'User type must be 1 or 2' });
    }

    try {
        const existingUserByUsername = await getUserByUsername(username);
        if (existingUserByUsername) {
            return res.status(400).send({ error: 'Enter another username, this username is already used.' });
        }

        const existingUserByEmail = await getUserByEmail(email);
        if (existingUserByEmail) {
            return res.status(400).send({ error: 'Enter another email, this email is already used.' });
        }

        const userID = await getNextSequenceValue('Users');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            fullName,
            username,
            email,
            password: hashedPassword,
            language,
            country,
            city,
            userID,  
            userTypeID,
            userType: userTypeMap[userTypeID]
        };

        await createUserInDB(newUser);
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}


async function patchUserEmail(req, res) {
    const { userID } = req.params;
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        const userWithSameEmail = await getUserByEmail(email);
        if (userWithSameEmail) {
            return res.status(400).send({ error: 'Enter another email, this email is already used.' });
        }

        const result = await updateUserEmailInDB(userID, { email });
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Email updated successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating email:', error);
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
    const { fullName, username, email, password, language, country, city, userTypeID } = req.body;

    if (!fullName || !username || !email || !password || !language || !country || !city || userTypeID === undefined) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {

        const userWithSameUsername = await getUserByUsername(username);
        if (userWithSameUsername) {
            return res.status(400).send({ error: 'Enter another username, this username is already used.' });
        }
        
        
        const existingUserByEmail = await getUserByEmail(email);
        if (existingUserByEmail) {
            return res.status(400).send({ error: 'Enter another email, this email is already used.' });
        }
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

module.exports = { checkUserCredentials, patchUserEmail, getUserIDByUsername, editUser ,deleteUser, listAllUsers, createUser, GetUserByID };
