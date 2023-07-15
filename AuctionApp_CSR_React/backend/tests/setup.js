import { initSequelize } from '../database/database-initializer.js'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'

jest.mock('../database/database.js')
beforeAll(async () => {
  await initSequelize()
})
beforeEach(async () => {
  await Offer.destroy({ truncate: true })
  await Auction.destroy({ truncate: true })
  await User.destroy({ truncate: true })
})
