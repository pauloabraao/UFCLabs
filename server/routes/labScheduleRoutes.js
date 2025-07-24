import express from 'express';
const router = express.Router();
import { 
  getAllLabSchedules, 
  createLabSchedule, 
  getLabScheduleById, 
  updateLabSchedule, 
  deleteLabSchedule,
  getLabSchedulesByLabId
} from '../controllers/labScheduleController.js';

router.get('/', getAllLabSchedules);
router.post('/', createLabSchedule);
router.get('/by-lab', getLabSchedulesByLabId);
router.get('/:lab_id/:time/:day_of_week', getLabScheduleById);
router.put('/:lab_id/:time/:day_of_week', updateLabSchedule);
router.delete('/:lab_id/:time/:day_of_week', deleteLabSchedule);

export default router;
