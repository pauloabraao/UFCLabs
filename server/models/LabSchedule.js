const { DataTypes } = require('sequelize');
const db = require('../config/db');

const LabSchedule = db.define('LabSchedule', {
  lab_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  time: {
    type: DataTypes.ENUM('08:00 - 10:00', '10:00 - 12: 00', '13:30 - 15:30', '15:30 - 17:30', '18:00 - 20:00', '20:00 - 22:00'),
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

module.exports = LabSchedule;
