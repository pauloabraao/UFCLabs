const ScheduleSlot = require('../models/ScheduleSlot');

exports.getAllScheduleSlots = async (req, res) => {
  try {
    const slots = await ScheduleSlot.findAll();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createScheduleSlot = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const newSlot = await ScheduleSlot.create({ start_time, end_time });
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getScheduleSlotById = async (req, res) => {
  try {
    const slot = await ScheduleSlot.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: 'ScheduleSlot not found' });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateScheduleSlot = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const slot = await ScheduleSlot.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: 'ScheduleSlot not found' });
    }
    await slot.update({ start_time, end_time });
    res.json(slot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteScheduleSlot = async (req, res) => {
  try {
    const slot = await ScheduleSlot.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: 'ScheduleSlot not found' });
    }
    await slot.destroy();
    res.json({ message: 'ScheduleSlot deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
