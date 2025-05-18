const MaintenanceRequest = require('../models/MaintenanceRequest');

exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { computer_id, description, requested_by, status, created_at } = req.body;
    const newRequest = await MaintenanceRequest.create({
      computer_id, description, requested_by, status, created_at
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMaintenanceRequestById = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'MaintenanceRequest not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaintenanceRequest = async (req, res) => {
  try {
    const { computer_id, description, requested_by, status, created_at } = req.body;
    const request = await MaintenanceRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'MaintenanceRequest not found' });
    }
    await request.update({ computer_id, description, requested_by, status, created_at });
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMaintenanceRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'MaintenanceRequest not found' });
    }
    await request.destroy();
    res.json({ message: 'MaintenanceRequest deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
