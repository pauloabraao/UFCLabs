import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ComputerIssue = db.define('ComputerIssue', {
  issue_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  computer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reported_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_reported: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('aberto', 'em andamento', 'resolvido'),
    allowNull: false
  },
  component: {
    type: DataTypes.ENUM('Monitor', 'mouse', 'teclado', 'gabinete', 'outros'),
    allowNull: false
  }
}, {
  tableName: 'ComputerIssue',
  timestamps: false
});

export default ComputerIssue;
