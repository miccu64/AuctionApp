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
