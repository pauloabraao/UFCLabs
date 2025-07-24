import { DataTypes } from 'sequelize';
import db from '../config/db.js';

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

export default ScheduleSlot;
