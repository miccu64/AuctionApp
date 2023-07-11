import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'

/**
 * @param {number} auctionId
 * @returns {Promise<Offer[]>}
 */
export function getOffersByAuctionId(auctionId) {
  return Offer.findAll({ where: { auctionId }, include: includeUser })
}

const includeUser = {
  model: User,
  as: 'user',
  attributes: ['id', 'fullName']
}
