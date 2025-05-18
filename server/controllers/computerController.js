const Computer = require('../models/Computer');

exports.getAllComputers = async (req, res) => {
  try {
    const computers = await Computer.findAll();
    res.json(computers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComputer = async (req, res) => {
  try {
    const { lab_id, os, cpu, ram, storage, status } = req.body;
    const newComputer = await Computer.create({ lab_id, os, cpu, ram, storage, status });
    res.status(201).json(newComputer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComputerById = async (req, res) => {
  try {
    const computer = await Computer.findByPk(req.params.id);
    if (!computer) {
      return res.status(404).json({ error: 'Computer not found' });
    }
    res.json(computer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComputer = async (req, res) => {
  try {
    const { lab_id, os, cpu, ram, storage, status } = req.body;
    const computer = await Computer.findByPk(req.params.id);
    if (!computer) {
      return res.status(404).json({ error: 'Computer not found' });
    }
    await computer.update({ lab_id, os, cpu, ram, storage, status });
    res.json(computer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComputer = async (req, res) => {
  try {
    const computer = await Computer.findByPk(req.params.id);
    if (!computer) {
      return res.status(404).json({ error: 'Computer not found' });
    }
    await computer.destroy();
    res.json({ message: 'Computer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
