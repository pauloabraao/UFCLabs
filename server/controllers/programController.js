const Program = require('../models/Program');

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const { name, version } = req.body;
    const newProgram = await Program.create({ name, version });
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { name, version } = req.body;
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    await program.update({ name, version });
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    await program.destroy();
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
