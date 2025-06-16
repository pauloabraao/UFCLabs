const { DataTypes } = require('sequelize');
const db = require('../config/db');

const LabProgramRequest = db.define('LabProgramRequest', {
  request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lab_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  requested_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  program_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  version: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'instalado', 'negado'),
    allowNull: false
  },
  request_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'LabProgramRequest',
  timestamps: false
});

module.exports = LabProgramRequest;
