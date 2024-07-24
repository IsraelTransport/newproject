const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Vehicles'
}


async function getVehiclesFromDB(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, {projection}).toArray();
    } catch (error) {
        throw error;
    }
    finally{
        await mongo.close();
    }
}



module.exports = {
    getVehiclesFromDB
}
