import express from 'express'

export const auctionsRouter = express.Router()

auctionsRouter.get('/auctions', function (req, res, next) {
  res.render('auctions')
})
