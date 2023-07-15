import { createAuction } from '../services/auctions-service.js'
import { createOffer } from '../services/offer-service.js'
import { createUser } from '../services/user-service.js'

describe('Offer service tests', () => {
  test('Create offer', async () => {
    const user = await createUser('a', 'a', 'a')
    expect(user).not.toBeNull()

    const date = new Date()
    const auction = await createAuction('a', 'a', date, date, 111, user)
    expect(auction).not.toBeNull()

    const offer = await createOffer(11, date, auction, user)
    expect(offer).not.toBeNull()
  })
})
