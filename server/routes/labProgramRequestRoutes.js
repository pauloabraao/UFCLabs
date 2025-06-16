const express = require('express');
const router = express.Router();
const labProgramRequestController = require('../controllers/labProgramRequestController');

router.get('/', labProgramRequestController.getAllLabProgramRequests);
router.post('/', labProgramRequestController.createLabProgramRequest);
router.get('/:id', labProgramRequestController.getLabProgramRequestById);
router.put('/:id', labProgramRequestController.updateLabProgramRequest);
router.delete('/:id', labProgramRequestController.deleteLabProgramRequest);

module.exports = router;
