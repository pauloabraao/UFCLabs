import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const LabSchedule = db.define('LabSchedule', {
  lab_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  slot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  day_of_week: {
    type: DataTypes.ENUM('seg', 'ter', 'qua', 'qui', 'sex'),
    primaryKey: true,
    allowNull: false
  },
  discipline: {
    type: DataTypes.STRING(100)
  },
  teacher: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('Reservado', 'Livre'),
    allowNull: false
  }
}, {
  tableName: 'LabSchedule',
  timestamps: false
});

export default LabSchedule;
