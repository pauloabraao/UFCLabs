const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Program = db.define('Program', {
  program_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  version: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Program',
  timestamps: false
});

module.exports = Program;
