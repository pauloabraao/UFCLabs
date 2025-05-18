const express = require('express');
const router = express.Router();
const computerController = require('../controllers/computerController');

router.get('/', computerController.getAllComputers);
router.post('/', computerController.createComputer);
router.get('/:id', computerController.getComputerById);
router.put('/:id', computerController.updateComputer);
router.delete('/:id', computerController.deleteComputer);

module.exports = router;
