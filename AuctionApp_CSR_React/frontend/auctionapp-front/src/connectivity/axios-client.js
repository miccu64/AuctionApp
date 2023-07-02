import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosClient = axios.create({ baseURL: 'http://localhost:3001/' })

axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  (error) => onError(error)
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => onError(error)
)

function onError(error) {
  const errorMessage =
    'Wystąpił błąd podczas komunikacji z serwerem. ' +
    (error.response
      ? `Status: ${error.response.status}, szczegóły: ${error.response.data}`
      : `Szczegóły: ${error.message}`)
  toast.error(errorMessage)
  return Promise.reject(error)
}
