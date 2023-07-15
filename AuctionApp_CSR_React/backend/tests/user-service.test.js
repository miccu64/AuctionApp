import { createAuction } from '../services/auctions-service.js'
import { createUser, getAllAuctionsCreatedByUser } from '../services/user-service.js'
import { createDateWithAddedYears } from './test-utils.js'

describe('Models creation tests', () => {
  test('Create user', async () => {
    const user = await createUser('a', 'a', 'a')
    expect(user).not.toBeNull()
  })

  test('Should not create user with existing login', async () => {
    const user1 = await createUser('a', 'a', 'a')
    expect(user1).not.toBeNull()

    let user2
    try {
      user2 = await createUser('a', 'a', 'a')
    } catch {
    } finally {
      expect(user2).toBeFalsy()
    }
  })

  test('Should return active and inactive auctions created by user', async () => {
    const user1 = await createUser('a1', 'a', 'a')
    const user2 = await createUser('a2', 'a', 'a')
    expect(user1).not.toBeNull()
    expect(user2).not.toBeNull()

    const currentDate = new Date()
    const futureDate = createDateWithAddedYears(1)
    const pastDate = createDateWithAddedYears(-1)
    const user1auction1 = await createAuction('a', 'a', currentDate, futureDate, 111, user1)
    const user1auction2 = await createAuction('a', 'a', pastDate, pastDate, 111, user1)
    const user2auction1 = await createAuction('a', 'a', currentDate, futureDate, 111, user2)
    const user2auction2 = await createAuction('a', 'a', pastDate, pastDate, 111, user2)
    expect(user1auction1).not.toBeNull()
    expect(user1auction2).not.toBeNull()
    expect(user2auction1).not.toBeNull()
    expect(user2auction2).not.toBeNull()

    const auctions = await getAllAuctionsCreatedByUser(user1.getDataValue('id'))
    expect(auctions.length).toEqual(2)

    const auctionIds = auctions.map((a) => a.getDataValue('id'))
    expect(auctionIds).toContain(user1auction1.getDataValue('id'))
    expect(auctionIds).toContain(user1auction2.getDataValue('id'))
  })
})
