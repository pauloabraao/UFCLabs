import express from 'express';
const router = express.Router();
import { getAllCampuses, createCampus, getCampusById, updateCampus, deleteCampus } from '../controllers/campusController.js';

router.get('/', getAllCampuses);
router.post('/', createCampus);
router.get('/:id', getCampusById);
router.put('/:id', updateCampus);
router.delete('/:id', deleteCampus);

export default router;