import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosClient = axios.create({ baseURL: 'http://localhost:3001/' })

axiosClient.interceptors.request.use(
  (config) => {
    console.log(config.data)
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
  return Promise.reject(error)
}
