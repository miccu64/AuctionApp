import express from 'express'
import { createAuction } from '../database/database-models-factory.js'
import { User } from '../models/user.js'
import { jwtMiddleware } from '../security/jwt-middleware.js'

export const createRouter = express.Router()

createRouter.post('/create', jwtMiddleware, async function (req, res, next) {
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

  const user = await User.findByPk(req.userId)
  const auction = await createAuction(name, description, new Date(), endDateTime, maxAmount, user)

  return res.status(201).json(auction.getDataValue('id'))
})
