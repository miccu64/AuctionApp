import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database.js'

export class Offer extends Model {}

Offer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Offer',
    timestamps: false
  }
)
