import express from 'express'
import { createAuction } from '../database/database-models-factory.js'

export const createRouter = express.Router()

createRouter.post('/create', async function (req, res, next) {
  const name = req.body.name
  const description = req.body.description
  const creator = req.body.creator
  const startDateTime = new Date(req.body.startDateTime)
  const endDateTime = new Date(req.body.endDateTime)
  const maxAmount = req.body.maxAmount

  let message
  if (!name || !description || !creator || !startDateTime || !endDateTime || maxAmount < 1) {
    message = 'Nie podano poprawnych danych!'
  } else if (endDateTime < startDateTime) {
    message = 'Data końcowa nie może być wcześniejsza niż data startowa!'
  } else if (endDateTime < new Date()) {
    message = 'Data końcowa nie może być datą z przeszłości!'
  }

  if (message) {
    return res.status(400).json(message)
  }

  await createAuction(name, description, startDateTime, endDateTime, creator, maxAmount)
  return res.sendStatus(201)
})
