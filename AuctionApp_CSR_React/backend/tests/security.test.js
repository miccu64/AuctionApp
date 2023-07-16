import { jwtMiddleware } from '../security/jwt-middleware.js'
import { generateJwt, verifyJwt } from '../security/jwt-utils.js'
import { encrypt, passwordMatches } from '../security/password-utils.js'

describe('Security tests', () => {
  test('Should JWT middleware allow', () => {
    const jwtToken = generateJwt(1)
    const req = { headers: {} }
    req.headers['authorization'] = 'Bearer ' + jwtToken
    const res = {}
    const next = () => {}
    jwtMiddleware(req, res, next)

    expect(req.userId).toBeTruthy()
  })

  test('Should JWT middleware block request', () => {
    const jwtToken = generateJwt(1)
    const req = { headers: {} }
    req.headers['authorization'] = 'Bearer ' + jwtToken + 'a'
    const res = {}
    const next = () => {}

    try {
      jwtMiddleware(req, res, next)
    } catch {
    } finally {
      expect(req.userId).toBeFalsy()
    }
  })

  test('Should verify generated token', () => {
    const jwtToken = generateJwt(1)
    const verifyResult = verifyJwt(jwtToken)
    expect(verifyResult).toBeTruthy()
  })

  test('Should not verify wrong token', () => {
    const jwtToken = generateJwt(1) + 'a'
    const verifyResult = verifyJwt(jwtToken)
    expect(verifyResult).toBeFalsy()
  })

  test('Should encrypt and verify phrase', () => {
    const phrase = 'a'
    const encodedPhrase = encrypt(phrase)
    const result = passwordMatches(encodedPhrase, phrase)
    expect(result).toBeTruthy()
  })

  test('Should encrypt and not verify different phrase', () => {
    const phrase = 'a'
    const encodedPhrase = encrypt(phrase)
    const result = passwordMatches(encodedPhrase, 'b')
    expect(result).toBeFalsy()
  })
})
