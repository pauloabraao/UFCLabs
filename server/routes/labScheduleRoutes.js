import express from 'express';
const router = express.Router();
import { getAllLabSchedules, createLabSchedule, getLabScheduleById, updateLabSchedule, deleteLabSchedule } from '../controllers/labScheduleController.js';

router.get('/', getAllLabSchedules);
router.post('/', createLabSchedule);
router.get('/by-lab', labScheduleController.getLabSchedulesByLabId);
router.get('/:lab_id/:time/:day_of_week', labScheduleController.getLabScheduleById);
router.put('/:lab_id/:time/:day_of_week', labScheduleController.updateLabSchedule);
router.delete('/:lab_id/:time/:day_of_week', labScheduleController.deleteLabSchedule);

export default router;
