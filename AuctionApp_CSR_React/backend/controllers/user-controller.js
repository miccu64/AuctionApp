import { getUserOffersWithAuctions } from '../services/offer-service.js'
import { getAllAuctionsCreatedByUser } from '../services/user-service.js'

export async function getUserAuctionsAndOffers(req, res) {
  const auctions = await getAllAuctionsCreatedByUser(req.userId)
  const offers = await getUserOffersWithAuctions(req.userId)

  const currentTime = new Date()
  const createdAuctions = auctions.filter((a) => new Date(a.getDataValue('endDateTime')) > currentTime)
  const historicalAuctions = auctions.filter((a) => new Date(a.getDataValue('endDateTime')) <= currentTime)
  const submittedOffers = offers.filter(
    (o) => new Date(o.getDataValue('auction').getDataValue('endDateTime')) > currentTime
  )
  const submittedHistoricalOffers = offers.filter(
    (o) => new Date(o.getDataValue('auction').getDataValue('endDateTime')) <= currentTime
  )

  return res.json({ createdAuctions, historicalAuctions, submittedOffers, submittedHistoricalOffers })
}
