const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
};

async function getNextSequenceValue(collectionName) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const collection = mongo.db(DB_INFO.name).collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`Collection ${collectionName} has ${count} documents.`);
        return count + 1;
    } catch (error) {
        console.error(`Error getting next sequence value for ${collectionName}:`, error);
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = { getNextSequenceValue };
