import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  // using local file to tests, bcs inmemory has problems with transactions
  storage: 'test-db.sqlite',
  logging: () => {}
})
