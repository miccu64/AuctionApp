import { Offer } from '../models/offer.js'
import { createAuction, getAllAuctionsSortedAsc, getAuctionById } from '../services/auctions-service.js'
import { createOffer } from '../services/offer-service.js'
import { getUserById } from '../services/user-service.js'

export async function getAuctions(req, res) {
  const auctions = await getAllAuctionsSortedAsc()

  return res.json(auctions)
}

export async function getAuction(req, res) {
  const auctionId = req.params.id
  const auction = await getAuctionById(auctionId)
  if (!auction) {
    return res.sendStatus(404)
  }

  return res.json(auction)
}

export async function putOffer(req, res) {
  const auctionId = req.params.id
  const auction = await getAuctionById(auctionId)
  const amount = req.body.amount

  if (!auction || amount <= 0) {
    return res.status(400).json('Nie podano poprawnych danych')
  }

  const userId = req.userId
  const user = await getUserById(userId)
  if (auction.getDataValue('userId') === userId) {
    return res.status(400).json('Nie możesz brać udziału we własnym przetargu')
  }

  const existingOffer = await Offer.findOne({ where: { auctionId: auction.getDataValue('id'), userId: userId } })
  if (!existingOffer) {
    await createOffer(amount, new Date(), auction, user)

    return res.status(201).json('Pomyślnie utworzono ofertę')
  } else {
    existingOffer.setAttributes({ amount, dateTime: new Date() })
    await existingOffer.save()

    return res.status(200).json('Składałeś już ofertę - jej wartość została zastąpiona nową wartością')
  }
}

export async function createNewAuction(req, res) {
  const name = req.body.name
  const description = req.body.description
  const endDateTime = new Date(req.body.endDateTime)
  const maxAmount = req.body.maxAmount

  let message
  if (!name || !description || !endDateTime || maxAmount < 1) {
    message = 'Nie podano poprawnych danych!'
  } else if (endDateTime < new Date()) {
    message = 'Data końcowa nie może być datą z przeszłości!'
  }

  if (message) {
    return res.status(400).json(message)
  }

  const user = await getUserById(req.userId)
  const auction = await createAuction(name, description, new Date(), endDateTime, maxAmount, user)

  return res.status(201).json(auction.getDataValue('id'))
}
