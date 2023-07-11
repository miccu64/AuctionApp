import { getAuctionsCreatedByUser } from '../services/auctions-service.js'

export async function getUserAuctions(req, res) {
  const auctions = await getAuctionsCreatedByUser(req.userId)

  return res.json(auctions)
}

export async function getUserOffers(req, res) {
  const offers = getUserOffers(req.userId)

  return res.json(offers)
}
