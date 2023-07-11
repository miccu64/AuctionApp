import express from 'express'
import { getHistoricalAuction, getHistoricalAuctions } from '../controllers/history-controller.js'

export const historyRouter = express.Router()

const basePath = '/history/'

historyRouter.get(`${basePath}`, getHistoricalAuctions)
historyRouter.get(`${basePath}:id`, getHistoricalAuction)
