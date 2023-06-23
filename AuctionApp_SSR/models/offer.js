import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database.js';

export class Offer extends Model { }

Offer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  creator: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Offer',
  timestamps: false
});
