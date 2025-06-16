const express = require('express');
const router = express.Router();
const laboratoryController = require('../controllers/laboratoryController');

router.get('/', laboratoryController.getAllLaboratories);
router.post('/', laboratoryController.createLaboratory);
router.get('/:id', laboratoryController.getLaboratoryById);
router.put('/:id', laboratoryController.updateLaboratory);
router.delete('/:id', laboratoryController.deleteLaboratory);

module.exports = router;
