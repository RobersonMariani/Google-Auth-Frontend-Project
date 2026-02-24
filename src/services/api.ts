import axios from 'axios'
import type { ApiErrorDTO } from '@/dtos/ApiResponseDTO'

const TOKEN_KEY = 'auth_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as ApiErrorDTO
      const message = data.error || data.message || 'Ocorreu um erro inesperado.'
      return Promise.reject(new Error(message))
    }
    return Promise.reject(new Error('Erro de conexão com o servidor.'))
  },
)

export default api
