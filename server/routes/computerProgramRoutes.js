const express = require('express');
const router = express.Router();
const computerProgramController = require('../controllers/computerProgramController');

router.get('/', computerProgramController.getAllComputerPrograms);
router.post('/', computerProgramController.createComputerProgram);
router.get('/:computer_id/:program_id', computerProgramController.getComputerProgramById);
router.delete('/:computer_id/:program_id', computerProgramController.deleteComputerProgram);

module.exports = router;
