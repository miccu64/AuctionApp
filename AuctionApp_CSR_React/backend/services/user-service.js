import { sequelize } from '../database/database.js'
import { User } from '../models/user.js'
import { generateJwt } from '../security/jwt-utils.js'
import { encrypt, passwordMatches } from '../security/password-utils.js'

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
 * @param {string} login
 * @returns {Promise<User>}
 */
export function getUserByLogin(login) {
  return User.findOne({
    where: {
      login
    }
  })
}

/**
 * @param {string} login
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function trySignInUser(login, password) {
  const user = await getUserByLogin(login)

  return !user || !passwordMatches(user.getDataValue('password'), password)
    ? null
    : generateJwt(user.getDataValue('id'))
}

/**
 * @param {number} id
 * @returns {Promise<User>}
 */
export function getUserById(id) {
  return User.findByPk(id)
}
