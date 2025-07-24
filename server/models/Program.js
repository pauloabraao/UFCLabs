import { DataTypes } from 'sequelize';
import db from '../config/db.js';

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

export default Program;
