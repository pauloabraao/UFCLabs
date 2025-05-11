const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Campus = db.define('Campus', {
  campus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Campus',
  timestamps: false
});

module.exports = Campus;