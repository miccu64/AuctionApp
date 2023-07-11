import { Auction } from '../models/auction.js'
import { Offer } from '../models/offer.js'

export async function getUserAuctions(req, res, next) {
  const auctions = await Auction.findAll({ where: { userId: req.userId } })

  return res.json(auctions)
}

export async function getUserOffers(req, res, next) {
  const offers = await Offer.findAll({ where: { userId: req.userId } })
  const auctionIds = offers.map((o) => o.getDataValue('auctionId'))
  const auctions = Auction.findAll({
    where: {
      id: { in: auctionIds }
    },
    attributes: {
      exclude: ['maxAmount']
    }
  })

  return res.json(auctions)
}
