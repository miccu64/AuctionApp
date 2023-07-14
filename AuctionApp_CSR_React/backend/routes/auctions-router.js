import express from 'express'
import {
  createNewAuction,
  deleteAuction,
  getAuction,
  getAuctions,
  putOffer
} from '../controllers/auctions-controller.js'
import { jwtMiddleware } from '../security/jwt-middleware.js'

export const auctionsRouter = express.Router()

const basePath = '/auctions/'

auctionsRouter.get(`${basePath}`, getAuctions)
auctionsRouter.get(`${basePath}:id`, getAuction)
auctionsRouter.put(`${basePath}:id/add-offer`, jwtMiddleware, putOffer)
auctionsRouter.delete(`${basePath}:id`, jwtMiddleware, deleteAuction)
auctionsRouter.post(`${basePath}create`, jwtMiddleware, createNewAuction)
