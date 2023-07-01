import express from 'express'
import { Op } from 'sequelize'
import { createOffer } from '../database/database-models-factory.js'
import { Auction } from '../models/auction.js'
import { jwtMiddleware } from '../security/jwt-middleware.js'
import { isAuctionActive } from '../common/is-auction-active.js'
import { User } from '../models/user.js'

export const auctionsRouter = express.Router()

auctionsRouter.get('/auctions', async function (req, res, next) {
  const currentDateTime = new Date()
  const auctions = await Auction.findAll({
    where: {
      endDateTime: {
        [Op.gte]: currentDateTime
      }
    },
    order: [['startDateTime', 'ASC']]
  })

  return res.json(auctions)
})

auctionsRouter.get('/auctions/:id', async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)
  if (!auction || !isAuctionActive(auction)) {
    return res.sendStatus(404)
  }

  return res.json(auction)
})

auctionsRouter.post('/auctions/:id/add-offer', jwtMiddleware, async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)
  if (!isAuctionActive(auction)) {
    return res.status(400).json('Aukcja została już zakończona - nie dodano nowej oferty')
  }

  const amount = req.body.amount
  if (!auction || amount <= 0) {
    return res.status(400).json('Nie podano poprawnych danych!')
  }

  const user = await User.findByPk(req.userId)
  await createOffer(amount, new Date(), auction, user)

  return res.sendStatus(201)
})

async function getAuctionFromRequest(req) {
  const id = req.params.id
  return await Auction.findByPk(id, {
    attributes: { exclude: ['maxAmount'] }
  })
}
