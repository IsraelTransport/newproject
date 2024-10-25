const express = require('express');
const { createSchedule, getSchedules,getScheduleByUserID, getScheduleByID, updateSchedule, deleteSchedule } = require('./Schedule.Controller');
const router = express.Router();

router.post('/CreateSchedule', createSchedule);
router.get('/GetAllSchedules', getSchedules);
router.get('/GetScheduleByID/:id', getScheduleByID);
router.put('/UpdateSchedule/:id', updateSchedule);
router.delete('/DeleteSchedule/:id', deleteSchedule);
router.get('/GetScheduleByUserID/:userID', getScheduleByUserID);

module.exports = router;
