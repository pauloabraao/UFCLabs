const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Block = db.define('Block', {
  block_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  campus_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Block',
  timestamps: false
});

module.exports = Block;
