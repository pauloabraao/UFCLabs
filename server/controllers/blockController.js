const Block = require('../models/Block');

exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await Block.findAll();
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBlock = async (req, res) => {
  try {
    const { campus_id, name } = req.body;
    const newBlock = await Block.create({ campus_id, name });
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlockById = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlock = async (req, res) => {
  try {
    const { campus_id, name } = req.body;
    const block = await Block.findByPk(req.params.id);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    await block.update({ campus_id, name });
    res.json(block);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBlock = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    await block.destroy();
    res.json({ message: 'Block deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
