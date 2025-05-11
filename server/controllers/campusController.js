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