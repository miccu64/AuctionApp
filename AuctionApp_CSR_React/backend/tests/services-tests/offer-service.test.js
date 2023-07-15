import { createAuction } from '../../services/auctions-service.js'
import { createOffer, getOffersByAuctionId, getUserOffersWithAuctions } from '../../services/offer-service.js'
import { createUser } from '../../services/user-service.js'
import { createNotNullTestUser } from '../utils/test-utils.js'

describe('Offer service tests', () => {
  test('Create offer', async () => {
    const user = await createNotNullTestUser()
    const dateTime = new Date()
    const auction = await createAuction('a', 'a', dateTime, dateTime, 111, user)
    expect(auction).not.toBeNull()

    const amount = 11
    const offer = await createOffer(amount, dateTime, auction, user)
    expect(offer).not.toBeNull()
    expect(offer.getDataValue('amount').toString()).toEqual(amount.toString())
    expect(new Date(offer.getDataValue('dateTime'))).toEqual(dateTime)
    expect(offer.getDataValue('auctionId')).toEqual(auction.getDataValue('id'))
    expect(offer.getDataValue('userId')).toEqual(user.getDataValue('id'))
  })

  test('Should get offers by auction id', async () => {
    const user1 = await createUser('a1', 'a', 'a')
    const user2 = await createUser('a2', 'a', 'a')
    const user3 = await createUser('a3', 'a', 'a')
    expect(user1).not.toBeNull()
    expect(user2).not.toBeNull()
    expect(user3).not.toBeNull()

    const date = new Date()
    const auction = await createAuction('a', 'a', date, date, 111, user1)
    expect(auction).not.toBeNull()

    await createOffer(1111111, date, auction, user2)
    await createOffer(1111111, date, auction, user3)

    const offers = await getOffersByAuctionId(auction.getDataValue('id'))
    expect(offers.length).toEqual(2)
  })

  test('Get user offer with auction', async () => {
    const user1 = await createUser('a1', 'a', 'a')
    const user2 = await createUser('a2', 'a', 'a')
    const user3 = await createUser('a3', 'a', 'a')
    expect(user1).not.toBeNull()
    expect(user2).not.toBeNull()
    expect(user3).not.toBeNull()

    const dateTime = new Date()
    const auction1 = await createAuction('a', 'a', dateTime, dateTime, 111, user1)
    const auction2 = await createAuction('a', 'a', dateTime, dateTime, 111, user2)
    expect(auction1).not.toBeNull()
    expect(auction2).not.toBeNull()

    const offer1 = await createOffer(11, dateTime, auction1, user3)
    const offer2 = await createOffer(11, dateTime, auction2, user3)
    expect(offer1).not.toBeNull()
    expect(offer2).not.toBeNull()

    const dbOffers = await getUserOffersWithAuctions(user3.getDataValue('id'))
    expect(dbOffers.length).toEqual(2)

    const auctionIdsFromOffers = dbOffers.map((o) => o.getDataValue('auction').id)
    expect(auctionIdsFromOffers).toContain(auction1.getDataValue('id'))
    expect(auctionIdsFromOffers).toContain(auction2.getDataValue('id'))
  })
})
