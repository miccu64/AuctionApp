import jwt_decode from 'jwt-decode'

const jwtTokenLocalStorageKey = 'JwtToken'

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
  localStorage.setItem(jwtTokenLocalStorageKey, 'Bearer ' + token)
}

export function removeJwtToken() {
  localStorage.removeItem(jwtTokenLocalStorageKey)
}
