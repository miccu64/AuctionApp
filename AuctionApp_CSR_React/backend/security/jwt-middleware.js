import { verifyJwt } from './jwt-utils.js'

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  const decodedToken = verifyJwt(token)
  if (!decodedToken) {
    return res.sendStatus(401)
  }

  next()
}
