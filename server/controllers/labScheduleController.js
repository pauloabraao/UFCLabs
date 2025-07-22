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
    const { lab_id, time, day_of_week, discipline, teacher, status } = req.body;
    const newSchedule = await LabSchedule.create({ lab_id, time, day_of_week, discipline, teacher, status });
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLabScheduleById = async (req, res) => {
  try {
    const { lab_id, time, day_of_week } = req.params;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, time, day_of_week }
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
    const { lab_id, time, day_of_week } = req.params;
    const { discipline, teacher, status } = req.body;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, time, day_of_week }
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
    const { lab_id, time, day_of_week } = req.params;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, time, day_of_week }
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

exports.getLabSchedulesByLabId = async (req, res) => {
  try {
    const { lab_id } = req.query;
    if (!lab_id) {
      return res.status(400).json({ error: 'lab_id is required' });
    }
    // Include ScheduleSlot to get start_time and end_time
    const schedules = await LabSchedule.findAll({
      where: { lab_id }
    });
    // Map to flatten the response for frontend
    const result = schedules.map(s => ({
      lab_id: s.lab_id,
      time: s.time,
      day_of_week: s.day_of_week,
      discipline: s.discipline,
      teacher: s.teacher,
      status: s.status,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
