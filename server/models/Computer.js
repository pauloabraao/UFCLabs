import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Computer = db.define('Computer', {
  computer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lab_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  number_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  property_id: {
    type: DataTypes.STRING(30)
  },
  os: {
    type: DataTypes.STRING(100)
  },
  cpu: {
    type: DataTypes.STRING(100)
  },
  ram: {
    type: DataTypes.STRING(50)
  },
  storage: {
    type: DataTypes.STRING(50)
  },
  status: {
    type: DataTypes.ENUM('disponivel', 'fora de servico', 'em reparo'),
    allowNull: false
  }
}, {
  tableName: 'Computer',
  timestamps: false
});

export default Computer;
