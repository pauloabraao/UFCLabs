const { DataTypes } = require('sequelize');
const db = require('../config/db');

const MaintenanceRequest = db.define('MaintenanceRequest', {
  request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  computer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requested_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em reparo', 'concluido'),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'MaintenanceRequest',
  timestamps: false
});

module.exports = MaintenanceRequest;
