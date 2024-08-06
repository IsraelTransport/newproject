const { getNextSequenceValue } = require('../counters.db');
const { getDriversFromDB, getDriverByID, createDriverInDB, updateDriverInDB, deleteDriverFromDB } = require('./Drivers.db');
const Driver = require('./Drivers.Model');

async function getDrivers(req, res) {
    try {
        const drivers = await getDriversFromDB();
        res.status(200).send(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getDriver(req, res) {
    const { id } = req.params;
    try {
        const driver = await getDriverByID(id);
        if (driver) {
            res.status(200).send(driver);
        } else {
            res.status(404).send({ error: 'Driver not found' });
        }
    } catch (error) {
        console.error('Error fetching driver:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function createDriver(req, res) {
    const { fullName, username, email, password, language, country, city, drivingLicense, drivingLicenseExpiration } = req.body;

    if (!fullName || !username || !email || !password || !language || !country || !city || !drivingLicense || !drivingLicenseExpiration) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const userID = await getNextSequenceValue('Drivers');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDriver = new Driver({ fullName, username, email, password: hashedPassword, language, country, city, userID, drivingLicense, drivingLicenseExpiration });
        await createDriverInDB(newDriver);
        res.status(201).send({ message: 'Driver created successfully' });
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function updateDriver(req, res) {
    const { id } = req.params;
    const driverData = req.body;

    try {
        const result = await updateDriverInDB(id, driverData);
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Driver updated successfully' });
        } else {
            res.status(404).send({ error: 'Driver not found' });
        }
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function deleteDriver(req, res) {
    const { id } = req.params;

    try {
        const result = await deleteDriverFromDB(id);
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'Driver deleted successfully' });
        } else {
            res.status(404).send({ error: 'Driver not found' });
        }
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getDrivers, getDriver, createDriver, updateDriver, deleteDriver };
