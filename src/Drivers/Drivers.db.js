const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Drivers'
};

async function getDriversFromDB(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getDriverByIDFromDB(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ userID: parseInt(id) });
    } catch (error) {
        console.error('Error fetching driver by ID:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function createDriverInDB(driver) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(driver);
    } catch (error) {
        console.error('Error creating driver:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function updateDriverInDB(id, driverData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne({ userID: parseInt(id) }, { $set: driverData });
    } catch (error) {
        console.error('Error updating driver:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function deleteDriverFromDB(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).deleteOne({ userID: parseInt(id) });
    } catch (error) {
        console.error('Error deleting driver:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getDriverByNameFromDB(name) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const driver = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ fullName: name });
        return driver;
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}



module.exports = {
    getDriversFromDB,
    getDriverByIDFromDB,
    createDriverInDB,
    updateDriverInDB,
    deleteDriverFromDB,
    getDriverByNameFromDB
};
