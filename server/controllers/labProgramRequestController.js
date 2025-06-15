const LabProgramRequest = require('../models/LabProgramRequest');

exports.getAllLabProgramRequests = async (req, res) => {
  try {
    const requests = await LabProgramRequest.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLabProgramRequest = async (req, res) => {
  try {
    const { lab_id, requested_by, program_name, version, status, request_date } = req.body;
    const newRequest = await LabProgramRequest.create({
      lab_id, requested_by, program_name, version, status, request_date
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLabProgramRequestById = async (req, res) => {
  try {
    const request = await LabProgramRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'LabProgramRequest not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLabProgramRequest = async (req, res) => {
  try {
    const { lab_id, requested_by, program_name, version, status, request_date } = req.body;
    const request = await LabProgramRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'LabProgramRequest not found' });
    }
    await request.update({ lab_id, requested_by, program_name, version, status, request_date });
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLabProgramRequest = async (req, res) => {
  try {
    const request = await LabProgramRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'LabProgramRequest not found' });
    }
    await request.destroy();
    res.json({ message: 'LabProgramRequest deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
