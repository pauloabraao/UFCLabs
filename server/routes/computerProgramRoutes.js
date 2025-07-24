import express from 'express';
const router = express.Router();
import { getAllComputerPrograms, createComputerProgram, getComputerProgramById, deleteComputerProgram } from '../controllers/computerProgramController.js';

router.get('/', getAllComputerPrograms);
router.post('/', createComputerProgram);
router.get('/:computer_id/:program_id', getComputerProgramById);
router.delete('/:computer_id/:program_id', deleteComputerProgram);

export default router;
