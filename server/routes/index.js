import { Router } from 'express';

import campusRoutes from './campusRoutes.js'
import blockRoutes from './blockRoutes.js'
import laboratoryRoutes from './laboratoryRoutes.js'
import computerRoutes from './computerRoutes.js'
import scheduleSlotRoutes from './scheduleSlotRoutes.js'
import labScheduleRoutes from './labScheduleRoutes.js'
import programRoutes from './programRoutes.js'
import labProgramRequestRoutes from './labProgramRequestRoutes.js'
import computerProgramRoutes from './computerProgramRoutes.js'
import computerIssueRoutes from './computerIssueRoutes.js'
import maintenanceRequestRoutes from './maintenanceRequestRoutes.js'
import userRoutes from './userRoutes.js'
import authRoutes from './authRoutes.js'

const router = Router();

router.use('/campuses', campusRoutes);
router.use('/blocks', blockRoutes);
router.use('/laboratories', laboratoryRoutes);
router.use('/computers', computerRoutes);
router.use('/schedule-slots', scheduleSlotRoutes);
router.use('/lab-schedules', labScheduleRoutes);
router.use('/programs', programRoutes);
router.use('/lab-program-requests', labProgramRequestRoutes);
router.use('/computer-programs', computerProgramRoutes);
router.use('/computer-issues', computerIssueRoutes);
router.use('/maintenance-requests', maintenanceRequestRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;