import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database.js'

export class Auction extends Model {}

Auction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Auction',
    timestamps: false
  }
)
