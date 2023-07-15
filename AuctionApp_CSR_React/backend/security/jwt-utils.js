import jwt from 'jsonwebtoken'
import { jwtSecret } from './secrets.js'

/**
 * @param {number} userId
 * @returns {string}
 */
export function generateJwt(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' })
}

/**
 * @param {string} token
 * @returns {number}
 */
export function verifyJwt(token) {
  try {
    return jwt.verify(token, jwtSecret).userId
  } catch (e) {
    return null
  }
}
