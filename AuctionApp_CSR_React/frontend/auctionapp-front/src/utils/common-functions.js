export function getJwtToken() {
  return localStorage.getItem('JwtToken')
}

export function isLogged() {
  return getJwtToken()?.length > 0
}

/**
 * @param {string} token
 */
export function saveToken(token) {
  localStorage.setItem('JwtToken', 'Bearer ' + token)
}
