import express from 'express';
const router = express.Router();
import { getAllMaintenanceRequests, createMaintenanceRequest, getMaintenanceRequestById, updateMaintenanceRequest, deleteMaintenanceRequest } from '../controllers/maintenanceRequestController.js';

router.get('/', getAllMaintenanceRequests);
router.post('/', createMaintenanceRequest);
router.get('/:id', getMaintenanceRequestById);
router.put('/:id', updateMaintenanceRequest);
router.delete('/:id', deleteMaintenanceRequest);

export default router;
