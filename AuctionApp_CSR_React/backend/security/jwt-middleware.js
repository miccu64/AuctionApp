import { verifyJwt } from './jwt-utils.js'

export function jwtMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  const userId = verifyJwt(token)
  if (!userId) {
    return res.sendStatus(401)
  }

  req.userId = userId
  next()
}
