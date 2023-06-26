import express from 'express'
import { Op } from 'sequelize'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'

export const historyRouter = express.Router()

historyRouter.get('/history', async function (req, res, next) {
  const currentDateTime = new Date()
  const auctions = await Auction.findAll({
    where: {
      endDateTime: {
        [Op.lt]: currentDateTime
      }
    },
    include: { model: Offer, as: 'offers' }
  })
  console.log(auctions)
  
  res.render('history', { auctions })
})
