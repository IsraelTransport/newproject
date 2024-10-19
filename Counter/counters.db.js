const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
};

async function getNextSequenceValue(collectionName) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const database = mongo.db(DB_INFO.name);
        const collection = database.collection(collectionName);

        // Count the number of documents in the collection
        const count = await collection.countDocuments();

        // Return the next ID as count + 1
        return count + 1;
    } catch (error) {
        console.error('Error getting next sequence value:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = { getNextSequenceValue };
