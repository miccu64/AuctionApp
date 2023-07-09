import express from 'express'
import { Op } from 'sequelize'
import { isAuctionActive } from '../common/is-auction-active.js'
import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'
import { User } from '../models/user.js'

export const historyRouter = express.Router()

historyRouter.get('/history', async function (req, res, next) {
  const currentDateTime = new Date()
  const auctions = await Auction.findAll({
    where: {
      endDateTime: {
        [Op.lt]: currentDateTime
      }
    },
    include: [{ model: Offer, as: 'auctionOffers', attributes: ['amount'] }, includeUser]
  })

  return res.json(auctions)
})

historyRouter.get('/history/:id', async function (req, res, next) {
  const id = req.params.id
  const auction = await Auction.findByPk(id, {
    include: includeUser
  })

  if (isAuctionActive(auction)) {
    return res.sendStatus(404)
  }

  const maxAmount = auction.getDataValue('maxAmount')
  const offers = (await Offer.findAll({ where: { auctionId: id }, include: includeUser })).sort(
    (a, b) => a.getDataValue('amount') - b.getDataValue('amount')
  )
  const properOffers = offers.filter((o) => o.getDataValue('amount') <= maxAmount)
  const otherOffers = offers.filter((o) => o.getDataValue('amount') > maxAmount)

  return res.json({ auction, properOffers, otherOffers })
})

const includeUser = {
  model: User,
  as: 'user',
  attributes: ['id', 'fullName']
}
