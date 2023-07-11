import { createUser } from '../database/database-models-factory.js'
import { getUserByLogin as getUserByLogin, trySignInUser } from '../services/user-service.js'

export async function signInUser(req, res, next) {
  let login = req.body.login?.toLowerCase()
  const password = req.body.password

  const jwtToken = await trySignInUser(login, password)
  if (!jwtToken) {
    return res.status(400).json('Niepoprawny login lub hasło')
  }

  return res.json(jwtToken)
}

export async function registerUser(req, res, next) {
  let login = req.body.login?.toLowerCase()
  const password = req.body.password
  const fullName = req.body.fullName

  if (!login || !password || !fullName) {
    return res.status(400).json('Nie podano wszystkich danych')
  }

  const user = await getUserByLogin(login)
  if (user) {
    return res.status(409).json('Użytkownik o takim loginie już istnieje - podaj inny')
  }

  await createUser(login, password, fullName)
  return res.sendStatus(201)
}
