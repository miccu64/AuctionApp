import express from 'express'
import { Auction } from '../models/auction.js'

export const detailsRouter = express.Router()

detailsRouter.get('/details/:id', async function (req, res, next) {
  const id = req.params.id
  const auction = await Auction.findByPk(id)

  res.render('details', { auction })
})
