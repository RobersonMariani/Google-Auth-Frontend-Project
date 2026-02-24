export interface ApiResponseDTO<T> {
  message: string
  data: T
}

export interface ApiPaginatedResponseDTO<T> {
  message: string
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface AuthResponseDTO<T> {
  message: string
  data: T
  token: string
}

export interface ApiErrorDTO {
  error?: string
  message?: string
  errors?: Record<string, string[]>
}

export interface LoginUrlResponseDTO {
  url: string
}
