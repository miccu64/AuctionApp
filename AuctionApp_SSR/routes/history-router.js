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

historyRouter.get('/history/:id/details', async function (req, res, next) {
  const id = req.params.id
  const auction = await Auction.findByPk(id, {
    include: { model: Offer, as: 'offers' }
  })
  const maxAmount = auction.getDataValue('maxAmount')
  const offers = (await Offer.findAll({ where: { auctionId: id } })).sort((a, b) => {
    const aAmount = a.getDataValue('amount')
    const bAmount = b.getDataValue('amount')
    const aExceeds = aAmount > maxAmount
    const bExceeds = bAmount > maxAmount
    if (aExceeds && bExceeds) {
      return 0
    } else if (aExceeds) {
      return 1
    } else if (bExceeds) {
      return -1
    } else {
      return bAmount - aAmount
    }
  })
  const isResolved = offers.find((o) => o.getDataValue('amount') <= maxAmount)
  console.log(auction)
  console.log(offers)

  res.render('history-details', { auction, offers, isResolved })
})
