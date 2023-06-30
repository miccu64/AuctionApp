import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database.js'

export class User extends Model {}

User.init(
  {
    login: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false
  }
)
