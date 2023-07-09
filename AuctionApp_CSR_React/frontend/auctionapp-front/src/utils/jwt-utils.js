import jwt_decode from 'jwt-decode'

const jwtTokenLocalStorageKey = 'JwtToken'
const userIdLocalStorageKey = 'UserId'

export function getJwtToken() {
  return localStorage.getItem(jwtTokenLocalStorageKey)
}

export function isLogged() {
  const token = getJwtToken()

  if (!token) {
    return false
  }

  let decodedToken = {}
  decodedToken = jwt_decode(token)
  return decodedToken.exp * 1000 > new Date().getTime()
}

/**
 * @param {string} token
 */
export function saveJwtToken(token) {
  token = 'Bearer ' + token
  localStorage.setItem(jwtTokenLocalStorageKey, token)

  let decodedToken = {}
  decodedToken = jwt_decode(token)
  const userId = decodedToken.userId
  console.log(userId)
  localStorage.setItem(userIdLocalStorageKey, userId)
}

export function removeJwtToken() {
  localStorage.removeItem(jwtTokenLocalStorageKey)
  localStorage.removeItem(userIdLocalStorageKey)
}

export function getUserId() {
  return localStorage.getItem(userIdLocalStorageKey)
}
