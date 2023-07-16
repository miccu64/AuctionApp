import { sequelize } from '../database/database.js'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'
import { createAuction } from '../services/auctions-service.js'
import { createUser } from '../services/user-service.js'
import { createNotNullTestUser } from './utils/test-utils.js'

describe('Mocked SQLite database test', () => {
  test('Database should be initialized and empty', async () => {
    const auctions = await Auction.findAll()
    expect(auctions.length).toEqual(0)

    const users = await User.findAll()
    expect(users.length).toEqual(0)

    const offers = await Offer.findAll()
    expect(offers.length).toEqual(0)
  })

  test('Database dialect should be SQLite', () => {
    const dialect = sequelize.getDialect()?.toLocaleLowerCase()
    expect(dialect).toEqual('sqlite')
  })

  test('Should create all objects beside concurrency', async () => {
    const user = await createNotNullTestUser()
    const promises = []
    const date = new Date()

    const loopCount = 5
    for (let i = 0; i < loopCount; i++) {
      const userName = `user${i}`
      promises.push(createUser(userName, userName, userName))
      promises.push(createAuction('a', 'a', date, date, 111, user))
    }

    const results = await Promise.all(promises)
    expect(results.length).toEqual(2 * loopCount)
    expect(results.length + 1).toEqual((await User.count()) + (await Auction.count()))
  }, 15000)
})
