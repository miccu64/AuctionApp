import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { sequelize } from './database.js'
import { createAuction, createOffer } from './databaseModelsFactory.js'

export async function initSequelize() {
  await sequelize.authenticate()
  await initModels()
  await initExampleData()
}

async function initModels() {
  // TODO: delete drop
  await sequelize.drop()

  const foreignKeyOptions = { foreignKey: 'auctionId' }
  Auction.hasMany(Offer, foreignKeyOptions)
  Offer.belongsTo(Auction, foreignKeyOptions)

  await Auction.sync()
  await Offer.sync()
}

async function initExampleData() {
  const auction1 = await createAuction('Test', new Date(), new Date(), 'Jan Kowalski', 22222)
  const auction2 = await createAuction('Test2', new Date(2011, 11, 11), new Date(2033, 11, 11), 'Jan Kowalski', 33333)

  await createOffer('Maria Janosik', 111.11, new Date(), auction1.getDataValue('id'))
  await createOffer('Andżelika Wojnar', 2221.11, new Date(), auction1.getDataValue('id'))
  await createOffer('Maria Janosik', 22111.11, new Date(), auction2.getDataValue('id'))
  await createOffer('Maria Janosik', 421, new Date(), auction2.getDataValue('id'))
}
