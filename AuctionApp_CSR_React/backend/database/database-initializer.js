import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'
import { createAuction } from '../services/auctions-service.js'
import { createOffer } from '../services/offer-service.js'
import { createUser } from '../services/user-service.js'
import { sequelize } from './database.js'

export async function initSequelize() {
  await sequelize.authenticate()
  await initModels()

  if ((await User.count()) === 0) {
    await initExampleData()
  }
}

async function initModels() {
  Auction.hasMany(Offer, { foreignKey: 'auctionId', as: 'auctionOffers' })
  Offer.belongsTo(Auction, { foreignKey: 'auctionId', as: 'auction' })

  User.hasMany(Auction, { foreignKey: 'userId', as: 'userAuctions' })
  Auction.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  User.hasMany(Offer, { foreignKey: 'userId', as: 'userOffers' })
  Offer.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  await User.sync()
  await Auction.sync()
  await Offer.sync()
}

async function initExampleData() {
  const user1 = await createUser('1', '1', '1')
  const user2 = await createUser('JanKowalski', 'JanKowalski', 'Jan Kowalski')
  const user3 = await createUser('MariaJanosik', 'MariaJanosik', 'Maria Janosik')
  const user4 = await createUser('JanKupała', 'JanKupała', 'Jan Kupała')

  const auction1 = await createAuction('Test', 'Opis', new Date(), new Date(), 22222, user2)
  const auction2 = await createAuction(
    'Test2',
    'Długi opis Długi opis Długi opis Długi opis Długi opis',
    new Date(2011, 11, 11),
    new Date(2033, 11, 11),
    33333,
    user2
  )

  await createOffer(111.11, new Date(), auction1, user3)
  await createOffer(2221.11, new Date(), auction1, user1)
  await createOffer(333331.11, new Date(), auction1, user4)
  await createOffer(22111.11, new Date(), auction2, user3)
  await createOffer(421, new Date(), auction2, user3)
}
