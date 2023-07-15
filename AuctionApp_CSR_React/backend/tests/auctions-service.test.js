import { Auction } from '../models/auction.js'
import { createAuction, getAllAuctionsSortedAsc } from '../services/auctions-service.js'
import { createUser } from '../services/user-service.js'

test('Create auction, get from db and check equality', async () => {
  const user = await createDummyUser()
  const date = new Date()
  const auction = await createAuction('a', 'a', date, date, 111, user)
  expect(auction).not.toBeNull()

  const dbAuction = await Auction.findByPk(auction.getDataValue('id'))
  expect(dbAuction).not.toBeNull()

  expect(JSON.stringify(auction.dataValues)).toEqual(JSON.stringify(dbAuction.dataValues))
})

test('Check auctions from getAllAuctionsSortedAsc are ascending', async () => {
  const user = await createDummyUser()
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
  auctions = auctions
    .filter((a) => a.getDataValue('endDateTime') >= currentDate)
    .sort((a1, a2) => getAuctionStartDate(a1).getTime() - getAuctionStartDate(a2).getTime())
  const dbAuctions = await getAllAuctionsSortedAsc()

  expect(dbAuctions.length).toEqual(auctions.length)

  const dbAuctionsIds = dbAuctions.map((a) => a.getDataValue('id'))
  const auctionsIds = auctions.map((a) => a.getDataValue('id'))

  expect(JSON.stringify(dbAuctionsIds)).toEqual(JSON.stringify(auctionsIds))
})

async function createDummyUser() {
  const user = await createUser('a', 'a', 'a')
  expect(user).not.toBeNull()
  return user
}

/**
 * @param {number} yearsToAdd
 * @returns {Date}
 */
function createDateWithAddedYears(yearsToAdd) {
  const currentYear = new Date()
  currentYear.setFullYear(currentYear.getFullYear() + yearsToAdd)
  return currentYear
}

/**
 * @param {Auction} auction
 * @returns {Date}
 */
function getAuctionStartDate(auction) {
  return new Date(auction.getDataValue('startDateTime'))
}
