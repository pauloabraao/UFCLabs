const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');

router.get('/', blockController.getAllBlocks);
router.post('/', blockController.createBlock);
router.get('/:id', blockController.getBlockById);
router.put('/:id', blockController.updateBlock);
router.delete('/:id', blockController.deleteBlock);

module.exports = router;
