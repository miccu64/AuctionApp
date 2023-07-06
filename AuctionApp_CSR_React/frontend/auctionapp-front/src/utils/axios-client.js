import axios from 'axios'
import { toast } from 'react-toastify'
import { getJwtToken, removeJwtToken } from './jwt-utils'

export const axiosClient = axios.create({ baseURL: 'http://localhost:3001/' })

axiosClient.interceptors.request.use(
  (config) => {
    const jwtToken = getJwtToken()
    config.headers.setAuthorization(jwtToken)
    return config
  },
  (error) => onError(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => onError(error)
)

function onError(error) {
  const errorMessage =
    'Wystąpił błąd. ' +
    (error.response
      ? `Status: ${error.response.status}, szczegóły: ${error.response.data}`
      : `Szczegóły: ${error.message}`)
  toast.error(errorMessage)

  if (error.response.status === 401) {
    removeJwtToken()
    window.location.href = '/login'
  }

  return Promise.reject(error)
}
