import express from 'express';
const router = express.Router();
import { getAllLabSchedules, createLabSchedule, getLabScheduleById, updateLabSchedule, deleteLabSchedule } from '../controllers/labScheduleController.js';

router.get('/', getAllLabSchedules);
router.post('/', createLabSchedule);
router.get('/:lab_id/:slot_id/:day_of_week', getLabScheduleById);
router.put('/:lab_id/:slot_id/:day_of_week', updateLabSchedule);
router.delete('/:lab_id/:slot_id/:day_of_week', deleteLabSchedule);

export default router;
