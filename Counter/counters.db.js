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
        
        const lastDocument = await collection.find().sort({ userID: -1 }).limit(1).toArray();
        
        if (lastDocument.length === 0) {
            return 1;  
        } else {
            return lastDocument[0].userID + 1;  
        }
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = { getNextSequenceValue };
