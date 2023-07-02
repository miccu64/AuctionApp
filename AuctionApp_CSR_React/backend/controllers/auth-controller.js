import express from 'express'
import { createUser } from '../database/database-models-factory.js'
import { User } from '../models/user.js'
import { generateJwt } from '../security/jwt-utils.js'
import { passwordMatches } from '../security/password-utils.js'

export const authRouter = express.Router()

authRouter.post('/login', async function (req, res, next) {
  console.log(req.body)
  let login = req.body.login?.toLowerCase()
  const password = req.body.password

  if (!login || !password) {
    return res.status(400).json('Nie podano loginu i/lub hasła')
  }

  const user = await User.findOne({
    where: {
      login
    }
  })
  if (!user || !passwordMatches(user.getDataValue('password'), password)) {
    return res.status(401).json('Niepoprawny login lub hasło')
  }

  return res.json(generateJwt(user.getDataValue('id')))
})

authRouter.post('/register', async function (req, res, next) {
  let login = req.body.login?.toLowerCase()
  const password = req.body.password
  const fullName = req.body.fullName

  if (!login || !password || !fullName) {
    return res.status(400).json('Nie podano wszystkich danych')
  }

  const user = await User.findOne({
    where: {
      login
    }
  })
  if (user) {
    return res.status(409).json('Użytkownik o takim loginie już istnieje - podaj inny')
  }

  await createUser(login, password, fullName)
  return res.sendStatus(201)
})
