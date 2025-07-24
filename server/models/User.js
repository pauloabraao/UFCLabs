import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('User', {
  user_id: {
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
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('administrador', 'professor', 'estudante', 'tecnico'),
    allowNull: false
  }
}, {
  tableName: 'User',
  timestamps: false
});

export default User;
