import { Op } from 'sequelize'
import { Auction } from '../models/auction.js'
import { User } from '../models/user.js'

/**
 * @returns {Promise<Auction[]>}
 */
export function getAllAuctionsSortedAsc() {
  const currentDateTime = new Date()
  return Auction.findAll({
    where: {
      endDateTime: {
        [Op.gte]: currentDateTime
      }
    },
    attributes: auctionAttributes,
    order: [['startDateTime', 'ASC']],
    include: includeUser
  })
}

/**
 * @param {number} id
 * @returns {Promise<Auction>}
 */
export async function getAuctionById(id) {
  const currentDateTime = new Date()
  const auction = await Auction.findOne({
    attributes: auctionAttributes,
    include: includeUser,
    where: {
      id,
      endDateTime: { [Op.gt]: currentDateTime }
    }
  })

  return auction
}

/**
 * @param {number} id
 * @returns {Promise<Auction[]>}
 */
export function getAuctionsByUserId(id) {
  return Auction.findAll({ where: { userId: id } })
}

const includeUser = {
  model: User,
  as: 'user',
  attributes: ['id', 'fullName']
}

const auctionAttributes = { exclude: ['maxAmount'] }
