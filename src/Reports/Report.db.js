const { MongoClient } = require('mongodb');
const DB_INFO = {
    uri: process.env.CONNECTION_STRING,
    name: process.env.DB_NAME,
    collection: 'Reports'
};

async function createReportInDB(report) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        await mongo.db(DB_INFO.name).collection(DB_INFO.collection).insertOne(report);
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getReportsFromDB() {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).find().toArray();
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

async function getReportByID(id) {
    let mongo = new MongoClient(DB_INFO.uri);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).findOne({ ReportID: parseInt(id) });
    } catch (error) {
        console.error('Error fetching report by ID:', error);
        throw error;
    } finally {
        await mongo.close();
    }
}

module.exports = { createReportInDB, getReportsFromDB, getReportByID };
