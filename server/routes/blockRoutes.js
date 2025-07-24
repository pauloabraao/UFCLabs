import express from 'express';
const router = express.Router();
import { getAllBlocks, createBlock, getBlockById, updateBlock, deleteBlock } from '../controllers/blockController.js';

router.get('/', getAllBlocks);
router.post('/', createBlock);
router.get('/:id', getBlockById);
router.put('/:id', updateBlock);
router.delete('/:id', deleteBlock);

export default router;
