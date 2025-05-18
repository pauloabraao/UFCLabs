const ComputerIssue = require('../models/ComputerIssue');

exports.getAllComputerIssues = async (req, res) => {
  try {
    const issues = await ComputerIssue.findAll();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComputerIssue = async (req, res) => {
  try {
    const { computer_id, reported_by, description, date_reported, status, component } = req.body;
    const newIssue = await ComputerIssue.create({
      computer_id, reported_by, description, date_reported, status, component
    });
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComputerIssueById = async (req, res) => {
  try {
    const issue = await ComputerIssue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'ComputerIssue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComputerIssue = async (req, res) => {
  try {
    const { computer_id, reported_by, description, date_reported, status, component } = req.body;
    const issue = await ComputerIssue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'ComputerIssue not found' });
    }
    await issue.update({ computer_id, reported_by, description, date_reported, status, component });
    res.json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComputerIssue = async (req, res) => {
  try {
    const issue = await ComputerIssue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'ComputerIssue not found' });
    }
    await issue.destroy();
    res.json({ message: 'ComputerIssue deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
