import { getCurrentDateTime } from '../helpers/getCurrentDateTime.js'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { createAuction, createOffer } from './database-models-factory.js'
import { sequelize } from './database.js'

export async function initSequelize() {
  await sequelize.authenticate()
  await initModels()

  if ((await Auction.count()) === 0) {
    await initExampleData()
  }
}

async function initModels() {
  const foreignKeyOptions = { foreignKey: 'auctionId', as: 'offers' }
  Auction.hasMany(Offer, foreignKeyOptions)
  Offer.belongsTo(Auction, foreignKeyOptions)

  await Auction.sync()
  await Offer.sync()
}

async function initExampleData() {
  const auction1 = await createAuction('Test', 'Opis', getCurrentDateTime(), getCurrentDateTime(), 'Jan Kowalski', 22222)
  const auction2 = await createAuction(
    'Test2',
    'Długi opis Długi opis Długi opis Długi opis Długi opis',
    new Date(2011, 11, 11),
    new Date(2033, 11, 11),
    'Jan Kowalski',
    33333
  )

  await createOffer('Maria Janosik', 111.11, getCurrentDateTime(), auction1.getDataValue('id'))
  await createOffer('Andżelika Wojnar', 2221.11, getCurrentDateTime(), auction1.getDataValue('id'))
  await createOffer('Jan Kupała', 333331.11, getCurrentDateTime(), auction1.getDataValue('id'))
  await createOffer('Maria Janosik', 22111.11, getCurrentDateTime(), auction2.getDataValue('id'))
  await createOffer('Maria Janosik', 421, getCurrentDateTime(), auction2.getDataValue('id'))
}
