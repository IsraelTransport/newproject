const express = require('express');
const { createReport, getReports, getReport } = require('./Report.Controller');
const router = express.Router();

router.post('/CreateReport', createReport);
router.get('/GetAllReports', getReports);
router.get('/GetReport/:id', getReport);

module.exports = router;
