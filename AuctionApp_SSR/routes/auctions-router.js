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

  res.render('auctions', { auctions })
})

auctionsRouter.get('/auctions/:id/details', async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)

  res.render('auction-details', { auction })
})

auctionsRouter.get('/auctions/:id/add-offer', async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)

  res.render('auction-add-offer', { auction, message: null })
})

auctionsRouter.post('/auctions/:id/add-offer', async function (req, res, next) {
  const auction = await getAuctionFromRequest(req)
  let message

  if (new Date(auction.getDataValue('endDateTime')) < new Date()) {
    message = 'Aukcja została już zakończona - nie dodano nowej oferty'
  } else {
    const creator = req.body.creator
    const amount = req.body.amount

    if (!auction || !creator || amount <= 0) {
      message = 'Nie podano poprawnych danych!'
    } else {
      await createOffer(creator, amount, new Date(), auction.getDataValue('id'))
      message = 'Poprawnie utworzono ofertę!'
    }
  }

  res.render('auction-add-offer', { auction, message })
})

async function getAuctionFromRequest(req) {
  const id = req.params.id
  return await Auction.findByPk(id)
}
