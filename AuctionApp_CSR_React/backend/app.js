import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'

import { initSequelize } from './database/database-initializer.js'
import { auctionsRouter } from './routes/auctions-router.js'
import { createRouter } from './routes/create-router.js'
import { historyRouter } from './routes/history-router.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', auctionsRouter)
app.use('/', historyRouter)
app.use('/', createRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
})

export const appPromise = initSequelize().then(function () {
  return app
})
