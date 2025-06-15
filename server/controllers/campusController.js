const Campus = require('../models/Campus');

exports.getAllCampuses = async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCampus = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newCampus = await Campus.create({ name, location });
    res.status(201).json(newCampus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCampusById = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
    res.json(campus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCampus = async (req, res) => {
  try {
    const { name, location } = req.body;
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
    await campus.update({ name, location });
    res.json(campus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCampus = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
    await campus.destroy();
    res.json({ message: 'Campus deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};