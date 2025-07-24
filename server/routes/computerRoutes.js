import express from 'express';
const router = express.Router();
import { getAllComputers, createComputer, getComputerById, updateComputer, deleteComputer } from '../controllers/computerController.js';

router.get('/', getAllComputers);
router.post('/', createComputer);
router.get('/:id', getComputerById);
router.put('/:id', updateComputer);
router.delete('/:id', deleteComputer);

export default router;
