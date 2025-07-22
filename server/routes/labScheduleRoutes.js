const express = require('express');
const router = express.Router();
const labScheduleController = require('../controllers/labScheduleController');

router.get('/', labScheduleController.getAllLabSchedules);
router.post('/', labScheduleController.createLabSchedule);
router.get('/by-lab', labScheduleController.getLabSchedulesByLabId);
router.get('/:lab_id/:time/:day_of_week', labScheduleController.getLabScheduleById);
router.put('/:lab_id/:time/:day_of_week', labScheduleController.updateLabSchedule);
router.delete('/:lab_id/:time/:day_of_week', labScheduleController.deleteLabSchedule);

module.exports = router;
