import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('AuctionApp', 'sa', 'Haslo123!', {
  dialect: 'mssql',
  host: 'csr-database',
  dialectOptions: {
    options: {
      useUTC: true,
      dateFirst: 1
    }
  },
  logging: () => {}
})
