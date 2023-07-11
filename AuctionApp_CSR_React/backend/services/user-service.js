import { User } from '../models/user.js'
import { generateJwt } from '../security/jwt-utils.js'
import { passwordMatches } from '../security/password-utils.js'

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
