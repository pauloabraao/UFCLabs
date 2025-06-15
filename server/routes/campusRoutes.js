const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campusController');

router.get('/', campusController.getAllCampuses);
router.post('/', campusController.createCampus);
router.get('/:id', campusController.getCampusById);
router.put('/:id', campusController.updateCampus);
router.delete('/:id', campusController.deleteCampus);

module.exports = router;