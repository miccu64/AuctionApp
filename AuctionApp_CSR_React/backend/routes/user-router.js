import express from 'express'
import { getUserAuctions, getUserOffers } from '../controllers/user-controller.js'
import { jwtMiddleware } from '../security/jwt-middleware.js'

export const userRouter = express.Router()

const basePath = '/user/'

userRouter.get(`${basePath}auctions`, jwtMiddleware, getUserAuctions)
userRouter.get(`${basePath}offers`, jwtMiddleware, getUserOffers)
