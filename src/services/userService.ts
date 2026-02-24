import api from './api'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'
import type { UserDTO } from '@/dtos/UserDTO'
import type { UserFiltersDTO } from '@/dtos/UserFiltersDTO'
import type { AuthResponseDTO, ApiPaginatedResponseDTO } from '@/dtos/ApiResponseDTO'

export async function completeRegistration(data: RegisterUserDTO): Promise<AuthResponseDTO<UserDTO>> {
  const response = await api.post<AuthResponseDTO<UserDTO>>('/users/complete', data)
  return response.data
}

export async function fetchUsers(filters: UserFiltersDTO): Promise<ApiPaginatedResponseDTO<UserDTO>> {
  const params: Record<string, string | number> = {}

  if (filters.name) params.name = filters.name
  if (filters.cpf) params.cpf = filters.cpf
  if (filters.per_page) params.per_page = filters.per_page
  if (filters.page) params.page = filters.page

  const response = await api.get<ApiPaginatedResponseDTO<UserDTO>>('/users', { params })
  return response.data
}
