#!/usr/bin/env node

import browserSync from 'browser-sync'
import debug from 'debug'
import { createServer } from 'http'
import { appPromise } from '../app.js'

const debugLogger = debug('auctionapp-ssr:server')
const port = normalizePort(process.env.PORT || '3000')
let server

appPromise.then(function (app) {
  app.set('port', port)

  server = createServer(app)
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)

  browserSync.create().init({
    proxy: {
      target: `http://localhost:${server.address().port}`,
      ws: true
    },
    files: ['**/*.css', '**/*.js', '**/*.ejs']
  })
})

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debugLogger('Listening on ' + bind)
}
