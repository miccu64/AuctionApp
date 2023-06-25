import express from 'express'
import { Op } from 'sequelize'
import { Auction } from '../models/auction.js'

export const auctionsRouter = express.Router()

auctionsRouter.get('/auctions', async function (req, res, next) {
  const auctions = await Auction.findAll({
    where: {
      endDateTime: {
        [Op.lt]: new Date()
      }
    }
  })

  res.render('auctions', { auctions })
})

auctionsRouter.get('/auctions/:id/details', async function (req, res, next) {
  const id = req.params.id
  const auction = await Auction.findByPk(id)

  res.render('auction-details', { auction })
})

auctionsRouter.get('/auctions/:id/add-offer', async function (req, res, next) {
  const id = req.params.id

  res.render('auction-add-offer', { id })
})
