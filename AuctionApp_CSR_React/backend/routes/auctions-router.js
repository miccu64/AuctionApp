import express from 'express'
import { Op } from 'sequelize'
import { createOffer } from '../database/database-models-factory.js'
import { Auction } from '../models/auction.js'

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

  res.json(auctions)
})

auctionsRouter.get('/auctions/:id', async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)
  if (!auction) {
    res.status(404)
  } else {
    res.json(auction)
  }
})

auctionsRouter.post('/auctions/:id/add-offer', async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)

  if (isAuctionInactive(auction)) {
    res.status(400).json('Aukcja została już zakończona - nie dodano nowej oferty')
    return
  }

  const creator = req.body.creator
  const amount = req.body.amount

  if (!auction || !creator || amount <= 0) {
    res.status(400).json('Nie podano poprawnych danych!')
  } else {
    await createOffer(creator, amount, new Date(), auction.getDataValue('id'))
    res.status(201)
  }
})

async function getAuctionFromRequest(req) {
  const id = req.params.id
  return await Auction.findByPk(id)
}

function isAuctionInactive(auction) {
  return new Date(auction.getDataValue('endDateTime')) < new Date()
}
