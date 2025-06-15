const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ScheduleSlot = db.define('ScheduleSlot', {
  slot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'ScheduleSlot',
  timestamps: false
});

module.exports = ScheduleSlot;
