const { MongoClient } = require('mongodb');

const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Users'
};

async function getUsersFromDB(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find(query, {projection}).toArray();
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getUserByUsername(username) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const database = mongo.db(DB_INFO.name);
        const users = database.collection(DB_INFO.collection);
        const user = await users.findOne({ username });
        return user;
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getLastUserID() {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const database = mongo.db(DB_INFO.name);
        const users = database.collection(DB_INFO.collection);
        const lastUser = await users.findOne({}, { sort: { UserID: -1 } });
        return lastUser;
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

async function createUserInDB(user) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        const database = mongo.db(DB_INFO.name);
        const users = database.collection(DB_INFO.collection);
        await users.insertOne(user);
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = {
    getUsersFromDB,
    getUserByUsername,
    getLastUserID,
    createUserInDB
};
