import express from 'express';
const router = express.Router();
import { getAllLaboratories, createLaboratory, getLaboratoryById, updateLaboratory, deleteLaboratory } from '../controllers/laboratoryController.js';

router.get('/', getAllLaboratories);
router.post('/', createLaboratory);
router.get('/:id', getLaboratoryById);
router.put('/:id', updateLaboratory);
router.delete('/:id', deleteLaboratory);

export default router;
