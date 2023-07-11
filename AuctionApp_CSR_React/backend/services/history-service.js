import { Op } from 'sequelize'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'

/**
 * @returns {Promise<Auction[]>}
 */
export function getAllHistoricalAuctions() {
  const currentDateTime = new Date()

  return Auction.findAll({
    where: {
      endDateTime: {
        [Op.lt]: currentDateTime
      }
    },
    include: [{ model: Offer, as: 'auctionOffers', attributes: ['amount'] }, includeUser]
  })
}

/**
 * @param {number} id
 * @returns {Promise<Auction>}
 */
export function getHistoricalAuctionById(id) {
  const currentDateTime = new Date()

  return Auction.findOne({
    include: includeUser,
    where: {
      id,
      endDateTime: { [Op.lte]: currentDateTime }
    }
  })
}

const includeUser = {
  model: User,
  as: 'user',
  attributes: ['id', 'fullName']
}
