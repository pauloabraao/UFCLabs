const Laboratory = require('../models/Laboratory');

exports.getAllLaboratories = async (req, res) => {
  try {
    const labs = await Laboratory.findAll();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLaboratory = async (req, res) => {
  try {
    const { block_id, name, capacity, num_computers } = req.body;
    const newLab = await Laboratory.create({ block_id, name, capacity, num_computers });
    res.status(201).json(newLab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLaboratoryById = async (req, res) => {
  try {
    const lab = await Laboratory.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Laboratory not found' });
    }
    res.json(lab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLaboratory = async (req, res) => {
  try {
    const { block_id, name, capacity, num_computers } = req.body;
    const lab = await Laboratory.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Laboratory not found' });
    }
    await lab.update({ block_id, name, capacity, num_computers });
    res.json(lab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLaboratory = async (req, res) => {
  try {
    const lab = await Laboratory.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Laboratory not found' });
    }
    await lab.destroy();
    res.json({ message: 'Laboratory deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
