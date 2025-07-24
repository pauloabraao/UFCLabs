import express from 'express';
const router = express.Router();
import { getAllPrograms, createProgram, getProgramById, updateProgram, deleteProgram } from '../controllers/programController.js';

router.get('/', getAllPrograms);
router.post('/', createProgram);
router.get('/:id', getProgramById);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

export default router;
