import express from 'express';
const router = express.Router();
import { getAllComputerIssues, createComputerIssue, getComputerIssueById, updateComputerIssue, deleteComputerIssue } from '../controllers/computerIssueController.js';

router.get('/', getAllComputerIssues);
router.post('/', createComputerIssue);
router.get('/:id', getComputerIssueById);
router.put('/:id', updateComputerIssue);
router.delete('/:id', deleteComputerIssue);

export default router;
