const { MongoClient, ObjectId } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Trips'
};

async function getTripsFromDB() {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find().toArray();
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getTripByID(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ BookingID: parseInt(id) });
    } catch (error) {
        console.error('Error fetching trip by ID:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function createTripInDB(tripData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const result = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(tripData);
        console.log('Trip created:', result);
        return result.insertedId; // Return the ID of the created trip document
    } catch (error) {
        console.error('Error creating trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function updateTripInDB(id, tripData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne({ BookingID: parseInt(id) }, { $set: tripData });
    } catch (error) {
        console.error('Error updating trip:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function deleteTripFromDB(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).deleteOne({ BookingID: parseInt(id) });
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
    createTripInDB,
    updateTripInDB,
    deleteTripFromDB
};
