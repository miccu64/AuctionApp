import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('AuctionApp', 'sa', 'Agilero123!', {
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1
    }
  },
  logging: (sql) => console.log(sql)
})
