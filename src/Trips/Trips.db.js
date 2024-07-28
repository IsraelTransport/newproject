const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Trips'
};

async function getTripsFromDB(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getTripByID(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ TripID: parseInt(id) });
    } catch (error) {
        console.error('Error fetching trip by ID:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function createReadyTripInDB(tripData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(tripData);
    } catch (error) {
        console.error('Error creating trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function updateReadyTripInDB(id, tripData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne({ TripID: parseInt(id) }, { $set: tripData });
    } catch (error) {
        console.error('Error updating trip:', error);
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
        console.error('Error deleting trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = {
    getTripsFromDB,
    getTripByID,
    createReadyTripInDB,
    updateReadyTripInDB,
    deleteReadyTripFromDB
};
