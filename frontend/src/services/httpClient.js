import axios from 'axios'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || error.message
    console.error(`[HTTP Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${message}`)
    return Promise.reject(error)
  },
)

export default httpClient
