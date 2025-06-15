const express = require('express');
const router = express.Router();
const maintenanceRequestController = require('../controllers/maintenanceRequestController');

router.get('/', maintenanceRequestController.getAllMaintenanceRequests);
router.post('/', maintenanceRequestController.createMaintenanceRequest);
router.get('/:id', maintenanceRequestController.getMaintenanceRequestById);
router.put('/:id', maintenanceRequestController.updateMaintenanceRequest);
router.delete('/:id', maintenanceRequestController.deleteMaintenanceRequest);

module.exports = router;
