import express from 'express'
import { createUser } from '../database/database-models-factory.js'
import { User } from '../models/user.js'
import { generateJwt } from '../security/jwt-utils.js'
import { passwordMatches } from '../security/password-utils.js'

export const authRouter = express.Router()

authRouter.post('/login', async function (req, res, next) {
  let login = req.body.login
  const password = req.body.password

  if (!login || !password) {
    res.status(400).json('Nie podano loginu i/lub hasła!')
    return
  }

  login = login.toLowerCase()
  const user = await User.findByPk(login)
  if (!user) {
    res.status(401)
    return
  }

  if (passwordMatches(user.getDataValue('password'), password)) {
    return res.json(generateJwt(user.getDataValue('login')))
  } else {
    return res.status(404).send()
  }
})

authRouter.post('/register', async function (req, res, next) {
  let login = req.body.login
  const password = req.body.password
  const fullName = req.body.fullName

  if (!login || !password || !fullName) {
    res.status(400).json('Nie podano wszystkich danych')
    return
  }

  login = login.toLowerCase()
  const user = await User.findByPk(login)
  if (user) {
    res.status(409).json('Użytkownik o takim loginie już istnieje')
    return
  }

  await createUser(login, password, fullName)
  return res.status(201).send()
})
