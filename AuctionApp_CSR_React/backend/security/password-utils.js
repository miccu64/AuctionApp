import hmacSHA512 from 'crypto-js/hmac-sha512.js'
import { passwordSecret } from './secrets.js'

/**
 * @param {string} phrase
 */
export function encrypt(phrase) {
  return hmacSHA512(phrase, passwordSecret).toString()
}

/**
 * @param {string} encryptedPassword
 * @param {string} plainPassword
 */
export function passwordMatches(encryptedPassword, plainPassword) {
  return hmacSHA512(plainPassword, passwordSecret) === encryptedPassword
}