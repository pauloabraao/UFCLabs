const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Laboratory = db.define('Laboratory', {
  lab_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  block_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  num_computers: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Laboratory',
  timestamps: false
});

module.exports = Laboratory;
