import { getAllHistoricalAuctions, getHistoricalAuctionById } from '../services/history-service.js'
import { getOffersByAuctionId } from '../services/offer-service.js'

export async function getHistoricalAuctions(req, res) {
  const auctions = await getAllHistoricalAuctions()

  return res.json(auctions)
}

export async function getHistoricalAuction(req, res) {
  const id = req.params.id
  const auction = await getHistoricalAuctionById(id)

  if (!auction) {
    return res.sendStatus(404)
  }

  const maxAmount = auction.getDataValue('maxAmount')
  const offers = (await getOffersByAuctionId(id)).sort((a, b) => a.getDataValue('amount') - b.getDataValue('amount'))
  const properOffers = offers.filter((o) => o.getDataValue('amount') <= maxAmount)
  const otherOffers = offers.filter((o) => o.getDataValue('amount') > maxAmount)

  return res.json({ auction, properOffers, otherOffers })
}
