import { createAuction } from '../../services/auctions-service.js'
import { getAllHistoricalAuctions, getHistoricalAuctionById } from '../../services/history-service.js'
import { createDateWithAddedYears, createNotNullTestUser } from '../utils/test-utils.js'

describe('History service tests', () => {
  test('Should return only historical auctions', async () => {
    const user = await createNotNullTestUser()
    const dateTime = createDateWithAddedYears(-2)
    const auction1 = await createAuction('a', 'a', dateTime, dateTime, 111, user)
    const auction2 = await createAuction('a', 'a', dateTime, dateTime, 111, user)
    const auction3 = await createAuction('a', 'a', new Date(), createDateWithAddedYears(1), 111, user)
    expect(auction1).not.toBeNull()
    expect(auction2).not.toBeNull()
    expect(auction3).not.toBeNull()

    const auctions = await getAllHistoricalAuctions()
    const auctionsIds = auctions.map((a) => a.getDataValue('id'))
    expect(auctionsIds.length).toEqual(2)
    expect(auctionsIds).toContain(auction1.getDataValue('id'))
    expect(auctionsIds).toContain(auction2.getDataValue('id'))
  })

  test('Should return historical auction', async () => {
    const user = await createNotNullTestUser()
    const dateTime = createDateWithAddedYears(-2)
    const auction = await createAuction('a', 'a', dateTime, dateTime, 111, user)
    expect(auction).not.toBeNull()

    const auctionId = auction.getDataValue('id')
    const dbAuction = await getHistoricalAuctionById(auctionId)
    expect(dbAuction).not.toBeNull()
    expect(dbAuction.getDataValue('id')).toEqual(auctionId)
  })

  test('Should not return active auction', async () => {
    const user = await createNotNullTestUser()
    const auction = await createAuction('a', 'a', new Date(), createDateWithAddedYears(2), 111, user)
    expect(auction).not.toBeNull()

    const auctionId = auction.getDataValue('id')
    const dbAuction = await getHistoricalAuctionById(auctionId)
    expect(dbAuction).toBeNull()
  })
})
