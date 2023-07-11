import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import logger from 'morgan'
import multer from 'multer'
import path from 'path'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { initSequelize } from './database/database-initializer.js'
import { auctionsRouter } from './routes/auctions-router.js'
import { authRouter } from './routes/auth-router.js'
import { historyRouter } from './routes/history-router.js'
import { userRouter } from './routes/user-router.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().array())
app.use(cors())

app.use('/', authRouter)
app.use('/', auctionsRouter)
app.use('/', historyRouter)
app.use('/', userRouter)

app.use(function (req, res, next) {
  return res.sendStatus(404)
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  return res.sendStatus(err.status || 500)
})

export const appPromise = initSequelize().then(function () {
  return app
})
