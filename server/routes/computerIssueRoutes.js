const express = require('express');
const router = express.Router();
const computerIssueController = require('../controllers/computerIssueController');

router.get('/', computerIssueController.getAllComputerIssues);
router.post('/', computerIssueController.createComputerIssue);
router.get('/:id', computerIssueController.getComputerIssueById);
router.put('/:id', computerIssueController.updateComputerIssue);
router.delete('/:id', computerIssueController.deleteComputerIssue);

module.exports = router;
