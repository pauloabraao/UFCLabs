const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ComputerProgram = db.define('ComputerProgram', {
  computer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  program_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'ComputerProgram',
  timestamps: false
});

module.exports = ComputerProgram;
