const { getNextSequenceValue } = require('../counters.db');
const { createReportInDB, getReportsFromDB, getReportByID } = require('./Report.db');
const Report = require('./Report.Model');

async function createReport(req, res) {
    const { UserID, Message } = req.body;

    if (!UserID || !Message) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const ReportID = await getNextSequenceValue('Reports');
        const newReport = new Report({ 
            ReportID, 
            UserID, 
            Message, 
            Status: 'Pending' 
        });
        await createReportInDB(newReport);
        res.status(201).send({ message: 'Report created successfully' });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getReports(req, res) {
    try {
        const reports = await getReportsFromDB();
        res.status(200).send(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getReport(req, res) {
    const { id } = req.params;
    try {
        const report = await getReportByID(id);
        if (report) {
            res.status(200).send(report);
        } else {
            res.status(404).send({ error: 'Report not found' });
        }
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { createReport, getReports, getReport };
