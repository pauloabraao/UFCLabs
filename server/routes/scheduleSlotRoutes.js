const express = require('express');
const router = express.Router();
const scheduleSlotController = require('../controllers/scheduleSlotController');

router.get('/', scheduleSlotController.getAllScheduleSlots);
router.post('/', scheduleSlotController.createScheduleSlot);
router.get('/:id', scheduleSlotController.getScheduleSlotById);
router.put('/:id', scheduleSlotController.updateScheduleSlot);
router.delete('/:id', scheduleSlotController.deleteScheduleSlot);

module.exports = router;
