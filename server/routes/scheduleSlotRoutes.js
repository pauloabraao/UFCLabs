import express from 'express';
const router = express.Router();
import { getAllScheduleSlots, createScheduleSlot, getScheduleSlotById, updateScheduleSlot, deleteScheduleSlot } from '../controllers/scheduleSlotController.js';

router.get('/', getAllScheduleSlots);
router.post('/', createScheduleSlot);
router.get('/:id', getScheduleSlotById);
router.put('/:id', updateScheduleSlot);
router.delete('/:id', deleteScheduleSlot);

export default router;
