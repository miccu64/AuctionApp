import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'
import { encrypt } from '../security/password-utils.js'
import { sequelize } from './database.js'

/**
 * @param {string} name
 * @param {string} description
 * @param {Date} startDateTime
 * @param {Date} endDateTime
 * @param {string} creator
 * @param {number} maxAmount
 * @returns {Promise<Auction>}
 */
export async function createAuction(name, description, startDateTime, endDateTime, creator, maxAmount) {
  return await sequelize.transaction(
    async (transaction) =>
      await Auction.create(
        {
          name,
          description,
          startDateTime,
          endDateTime,
          creator,
          maxAmount
        },
        { transaction }
      )
  )
}

/**
 * @param {string} creator
 * @param {number} amount
 * @param {Date} dateTime
 * @param {number} auctionId
 * @returns {Promise<Offer>}
 */
export async function createOffer(creator, amount, dateTime, auctionId) {
  return await sequelize.transaction(
    async (transaction) =>
      await Offer.create(
        {
          creator,
          amount,
          dateTime,
          auctionId
        },
        { transaction }
      )
  )
}

/**
 * @param {string} login
 * @param {string} password
 * @param {string} fullName
 * @returns {Promise<User>}
 */
export async function createUser(login, password, fullName) {
  login = login.toLowerCase()
  const encryptedPassword = encrypt(password)
console.log(encryptedPassword)
  return await sequelize.transaction(
    async (transaction) =>
      await User.create(
        {
          login,
          password: encryptedPassword,
          fullName
        },
        { transaction }
      )
  )
}
