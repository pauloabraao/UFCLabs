import express from 'express';
const router = express.Router();
import { getAllLabProgramRequests, createLabProgramRequest, getLabProgramRequestById, updateLabProgramRequest, deleteLabProgramRequest } from '../controllers/labProgramRequestController.js';

router.get('/', getAllLabProgramRequests);
router.post('/', createLabProgramRequest);
router.get('/:id', getLabProgramRequestById);
router.put('/:id', updateLabProgramRequest);
router.delete('/:id', deleteLabProgramRequest);

export default router;
