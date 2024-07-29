const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Bookings'
};

async function getBookingsFromDB(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getBookingByID(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ BookingID: parseInt(id) });
    } catch (error) {
        console.error('Error fetching booking by ID:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function createBookingInDB(bookingData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(bookingData);
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function updateBookingInDB(id, bookingData) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne({ BookingID: parseInt(id) }, { $set: bookingData });
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function deleteBookingFromDB(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).deleteOne({ BookingID: parseInt(id) });
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = {
    getBookingsFromDB,
    getBookingByID,
    createBookingInDB,
    updateBookingInDB,
    deleteBookingFromDB
};
