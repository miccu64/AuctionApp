import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('AuctionApp', 'sa', 'Agilero123!', {
  dialect: 'mssql',
  //host: 'database',
  dialectOptions: {
    options: {
      useUTC: true,
      dateFirst: 1
    }
  },
  logging: (sql) => console.log(sql)
})
