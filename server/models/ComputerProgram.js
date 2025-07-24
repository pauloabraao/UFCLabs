import { DataTypes } from 'sequelize';
import db from '../config/db.js';

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

export default ComputerProgram;
