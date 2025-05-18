const express = require('express');
const router = express.Router();
const labScheduleController = require('../controllers/labScheduleController');

router.get('/', labScheduleController.getAllLabSchedules);
router.post('/', labScheduleController.createLabSchedule);
router.get('/:lab_id/:slot_id/:day_of_week', labScheduleController.getLabScheduleById);
router.put('/:lab_id/:slot_id/:day_of_week', labScheduleController.updateLabSchedule);
router.delete('/:lab_id/:slot_id/:day_of_week', labScheduleController.deleteLabSchedule);

module.exports = router;
