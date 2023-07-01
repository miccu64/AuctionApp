import jwt from 'jsonwebtoken'
import { jwtSecret } from './secrets.js'

/**
 * @param {string} username
 * @returns {string}
 */
export function generateJwt(username) {
  return jwt.sign(username, jwtSecret, { expiresIn: '1800s', algorithm: ['HS256'] })
}

/**
 * @param {string} token
 * @returns {boolean}
 */
export function verifyJwt(token) {
  try {
    return jwt.verify(token, jwtSecret, {complete: true})
  } catch {
    return false
  }
}
