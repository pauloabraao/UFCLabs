import { DataTypes } from 'sequelize';
import db from '../config/db.js';

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

export default Campus;