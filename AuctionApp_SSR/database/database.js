const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('AuctionApp', 'sa', 'Agilero123!', {
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1
    }
  }
});

export async function authSequelize() {
  await sequelize.authenticate();
}
