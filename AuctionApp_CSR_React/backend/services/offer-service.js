import { sequelize } from '../database/database.js'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'

/**
 * @param {number} amount
 * @param {Date} dateTime
 * @param {Auction} auction
 * @param {User} user
 * @returns {Promise<Offer>}
 */
export async function createOffer(amount, dateTime, auction, user) {
  return await sequelize.transaction(
    async (transaction) =>
      await Offer.create(
        {
          amount,
          dateTime,
          auctionId: auction.getDataValue('id'),
          userId: user.getDataValue('id')
        },
        { transaction }
      )
  )
}

/**
 * @param {number} auctionId
 * @returns {Promise<Offer[]>}
 */
export function getOffersByAuctionId(auctionId) {
  return Offer.findAll({ where: { auctionId }, include: includeUser })
}

export async function getUserOffers(userId) {
  return Offer.findAll({
    where: { userId },
    include: {
      model: Auction,
      as: 'auction'
    }
  })
}

const includeUser = {
  model: User,
  as: 'user',
  attributes: ['id', 'fullName']
}
