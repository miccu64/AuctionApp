import { sequelize } from '../database/database.js'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'

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
})
