const express = require('express');
const { getReports, createReport,getReportByID, deleteReport, updateReport } = require('./Report.Controller');
const router = express.Router();

router.get('/', getReports);
router.post('/create', createReport);
router.delete('/delete/:id', deleteReport);
router.put('/update/:id', updateReport);
router.get('/:id', getReportByID); // New route for getting a report by ID

module.exports = router;
