const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'ReadyTrips'
};

async function getReadyTripsFromDB(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        console.error('Error fetching ready trips:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getReadyTripByID(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ TripID: parseInt(id) });
    } catch (error) {
        console.error('Error fetching ready trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function createReadyTripInDB(readyTrip) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(readyTrip);
    } catch (error) {
        console.error('Error creating ready trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function updateReadyTripInDB(id, readyTripData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne({ TripID: parseInt(id) }, { $set: readyTripData });
    } catch (error) {
        console.error('Error updating ready trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function deleteReadyTripFromDB(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).deleteOne({ TripID: parseInt(id) });
    } catch (error) {
        console.error('Error deleting ready trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = {
    getReadyTripsFromDB,
    getReadyTripByID,
    createReadyTripInDB,
    updateReadyTripInDB,
    deleteReadyTripFromDB
};
