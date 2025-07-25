import express from 'express';
const router = express.Router();
import { getAllComputerPrograms, createComputerProgram, deleteComputerProgram, getProgramsByComputerId, getProgramsByProgramId } from '../controllers/computerProgramController.js';

router.get('/', getAllComputerPrograms);
router.post('/', createComputerProgram);
router.get('/computer/:computer_id', getProgramsByComputerId);
router.get('/:computer_id/:program_id', getProgramsByProgramId);
router.delete('/:computer_id/:program_id', deleteComputerProgram);

export default router;
