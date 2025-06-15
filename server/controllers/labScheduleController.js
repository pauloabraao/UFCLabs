const LabSchedule = require('../models/LabSchedule');

exports.getAllLabSchedules = async (req, res) => {
  try {
    const schedules = await LabSchedule.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLabSchedule = async (req, res) => {
  try {
    const { lab_id, slot_id, day_of_week, discipline, teacher, status } = req.body;
    const newSchedule = await LabSchedule.create({ lab_id, slot_id, day_of_week, discipline, teacher, status });
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLabScheduleById = async (req, res) => {
  try {
    const { lab_id, slot_id, day_of_week } = req.params;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, slot_id, day_of_week }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'LabSchedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLabSchedule = async (req, res) => {
  try {
    const { lab_id, slot_id, day_of_week } = req.params;
    const { discipline, teacher, status } = req.body;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, slot_id, day_of_week }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'LabSchedule not found' });
    }
    await schedule.update({ discipline, teacher, status });
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLabSchedule = async (req, res) => {
  try {
    const { lab_id, slot_id, day_of_week } = req.params;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, slot_id, day_of_week }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'LabSchedule not found' });
    }
    await schedule.destroy();
    res.json({ message: 'LabSchedule deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
