const { MongoClient, ObjectId } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Bookings'
};

async function getBookingsFromDB() {
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

async function getBookingByID(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        // Use BookingID instead of _id
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
        const result = await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(bookingData);
        console.log('Booking created:', result);
        return result.insertedId; // Return the ID of the created booking document
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
