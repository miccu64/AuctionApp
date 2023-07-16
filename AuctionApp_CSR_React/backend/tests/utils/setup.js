import { initSequelize } from '../../database/database-initializer.js'
import { Auction } from '../../models/auction.js'
import { Offer } from '../../models/offer.js'
import { User } from '../../models/user.js'

jest.mock('../../database/database.js')

beforeAll(async () => {
  await initSequelize()
}, 100000)

beforeEach(async () => {
  jest.resetModules()
  jest.clearAllMocks()
  await Offer.destroy({ truncate: true })
  await Auction.destroy({ truncate: true })
  await User.destroy({ truncate: true })
}, 100000)
