import express from 'express'
import { getUserAuctionsAndOffers } from '../controllers/user-controller.js'
import { jwtMiddleware } from '../security/jwt-middleware.js'

export const userRouter = express.Router()

const basePath = '/user/'

userRouter.get(`${basePath}participated`, jwtMiddleware, getUserAuctionsAndOffers)
