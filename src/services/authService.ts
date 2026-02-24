import api from './api'
import type { LoginUrlResponseDTO } from '@/dtos/ApiResponseDTO'

export async function getLoginUrl(): Promise<string> {
  const response = await api.get<LoginUrlResponseDTO>('/google/login-url')
  return response.data.url
}
