const ComputerProgram = require('../models/ComputerProgram');

exports.getAllComputerPrograms = async (req, res) => {
  try {
    const cps = await ComputerProgram.findAll();
    res.json(cps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComputerProgram = async (req, res) => {
  try {
    const { computer_id, program_id } = req.body;
    const newCP = await ComputerProgram.create({ computer_id, program_id });
    res.status(201).json(newCP);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComputerProgramById = async (req, res) => {
  try {
    const { computer_id, program_id } = req.params;
    const cp = await ComputerProgram.findOne({
      where: { computer_id, program_id }
    });
    if (!cp) {
      return res.status(404).json({ error: 'ComputerProgram not found' });
    }
    res.json(cp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComputerProgram = async (req, res) => {
  try {
    const { computer_id, program_id } = req.params;
    const cp = await ComputerProgram.findOne({
      where: { computer_id, program_id }
    });
    if (!cp) {
      return res.status(404).json({ error: 'ComputerProgram not found' });
    }
    await cp.destroy();
    res.json({ message: 'ComputerProgram deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
