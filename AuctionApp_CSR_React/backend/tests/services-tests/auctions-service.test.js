import { Auction } from '../../models/auction.js'
import { createAuction, getAllAuctionsSortedAsc, getAuctionById } from '../../services/auctions-service.js'
import { createDateWithAddedYears, createNotNullTestUser } from '../utils/test-utils.js'

describe('Auctions service tests', () => {
  test('Create auction', async () => {
    const user = await createNotNullTestUser()
    const name = 'a'
    const description = 'b'
    const startDateTime = new Date()
    const endDateTime = new Date()
    const maxAmount = 111

    const auction = await createAuction(name, description, startDateTime, endDateTime, maxAmount, user)
    expect(auction).not.toBeNull()
    expect(auction.getDataValue('name')).toEqual(name)
    expect(auction.getDataValue('description')).toEqual(description)
    expect(new Date(auction.getDataValue('startDateTime'))).toEqual(startDateTime)
    expect(new Date(auction.getDataValue('endDateTime'))).toEqual(endDateTime)
    expect(auction.getDataValue('maxAmount')).toEqual(maxAmount)
    expect(auction.getDataValue('userId')).toEqual(user.getDataValue('id'))
  })

  test('Create auction, get from db and check equality', async () => {
    const user = await createNotNullTestUser()
    const date = new Date()
    const auction = await createAuction('a', 'a', date, date, 111, user)
    expect(auction).not.toBeNull()

    const dbAuction = await Auction.findByPk(auction.getDataValue('id'))
    expect(dbAuction).not.toBeNull()

    expect(JSON.stringify(auction.dataValues)).toEqual(JSON.stringify(dbAuction.dataValues))
  })

  test('Return auctions ascending', async () => {
    const user = await createNotNullTestUser()
    const startEndDates = [
      [createDateWithAddedYears(-2), createDateWithAddedYears(6)],
      [createDateWithAddedYears(-10), createDateWithAddedYears(8)],
      [createDateWithAddedYears(-1), createDateWithAddedYears(5)]
    ]

    let auctions = await Promise.all(
      startEndDates.map(async (d) => {
        const a = await createAuction('a', 'a', d[0], d[1], 111, user)
        expect(a).not.toBeNull()
        return a
      })
    )

    auctions = auctions.sort((a1, a2) => getAuctionStartDate(a1).getTime() - getAuctionStartDate(a2).getTime())
    const dbAuctions = await getAllAuctionsSortedAsc()

    expect(dbAuctions.length).toEqual(auctions.length)

    const dbAuctionsIds = dbAuctions.map((a) => a.getDataValue('id'))
    const auctionsIds = auctions.map((a) => a.getDataValue('id'))

    expect(JSON.stringify(dbAuctionsIds)).toEqual(JSON.stringify(auctionsIds))
  })

  test('Return only active auctions', async () => {
    const user = await createNotNullTestUser()
    const startEndDates = [
      [createDateWithAddedYears(-2), createDateWithAddedYears(6)],
      [createDateWithAddedYears(-10), createDateWithAddedYears(8)],
      [createDateWithAddedYears(-4), createDateWithAddedYears(-2)],
      [createDateWithAddedYears(-1), createDateWithAddedYears(5)]
    ]

    let auctions = await Promise.all(
      startEndDates.map(async (d) => {
        const a = await createAuction('a', 'a', d[0], d[1], 111, user)
        expect(a).not.toBeNull()
        return a
      })
    )

    const currentDate = new Date()
    auctions = auctions.filter((a) => a.getDataValue('endDateTime') >= currentDate)
    const dbAuctions = await getAllAuctionsSortedAsc()

    expect(dbAuctions.length).toEqual(auctions.length)
  })

  test('Return active auction by id', async () => {
    const user = await createNotNullTestUser()
    const auction = await createAuction('a', 'a', new Date(), createDateWithAddedYears(1), 111, user)
    expect(auction).not.toBeNull()

    const dbAuction = getAuctionById(auction.getDataValue('id'))
    expect(dbAuction).not.toBeNull()
  })

  test('Not return inactive auction by id', async () => {
    const user = await createNotNullTestUser()
    const pastDate = createDateWithAddedYears(-1)
    const auction = await createAuction('a', 'a', pastDate, pastDate, 111, user)
    expect(auction).not.toBeNull()

    const dbAuction = await getAuctionById(auction.getDataValue('id'))
    expect(dbAuction).toBeNull()
  })
})

/**
 * @param {Auction} auction
 * @returns {Date}
 */
function getAuctionStartDate(auction) {
  return new Date(auction.getDataValue('startDateTime'))
}
