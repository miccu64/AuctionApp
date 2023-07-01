import { Model } from 'sequelize'
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
 * @param {number} maxAmount
 * @param {User} user
 * @returns {Promise<Auction>}
 */
export async function createAuction(name, description, startDateTime, endDateTime, maxAmount, user) {
  return await sequelize.transaction(
    async (transaction) =>
      await Auction.create(
        {
          name,
          description,
          startDateTime,
          endDateTime,
          maxAmount,
          userId: getId(user)
        },
        { transaction }
      )
  )
}

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
          auctionId: getId(auction),
          userId: getId(user)
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

/**
 * @param {Model} model
 * @returns {number}
 */
function getId(model) {
  return model.getDataValue('id')
}
