import { describe, it, expect } from 'vitest'
import type { UserDTO } from '@/dtos/UserDTO'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'
import type { UserFiltersDTO } from '@/dtos/UserFiltersDTO'
import type { ApiResponseDTO, ApiPaginatedResponseDTO, ApiErrorDTO, LoginUrlResponseDTO } from '@/dtos/ApiResponseDTO'

describe('DTOs - type compatibility', () => {
  it('UserDTO aceita dados válidos', () => {
    const user: UserDTO = {
      id: 1,
      name: 'João',
      cpf: '52998224725',
      birth_date: '1990-01-01',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    }

    expect(user.id).toBe(1)
    expect(user.name).toBe('João')
  })

  it('RegisterUserDTO aceita dados de registro', () => {
    const dto: RegisterUserDTO = {
      name: 'João',
      cpf: '52998224725',
      birth_date: '1990-01-01',
      email: 'joao@email.com',
    }

    expect(dto.email).toBe('joao@email.com')
  })

  it('UserFiltersDTO aceita filtros parciais', () => {
    const filters: UserFiltersDTO = { name: 'João' }

    expect(filters.name).toBe('João')
    expect(filters.cpf).toBeUndefined()
  })

  it('ApiResponseDTO wraps data corretamente', () => {
    const response: ApiResponseDTO<UserDTO> = {
      message: 'Sucesso',
      data: {
        id: 1,
        name: 'João',
        cpf: '52998224725',
        birth_date: '1990-01-01',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
    }

    expect(response.message).toBe('Sucesso')
    expect(response.data.id).toBe(1)
  })

  it('ApiPaginatedResponseDTO contém metadados de paginação', () => {
    const response: ApiPaginatedResponseDTO<UserDTO> = {
      message: 'Listagem',
      data: [],
      current_page: 1,
      last_page: 5,
      per_page: 20,
      total: 100,
    }

    expect(response.total).toBe(100)
    expect(response.last_page).toBe(5)
  })

  it('ApiErrorDTO aceita diferentes formatos de erro', () => {
    const error1: ApiErrorDTO = { error: 'Não autorizado' }
    const error2: ApiErrorDTO = { message: 'Erro', errors: { cpf: ['CPF inválido'] } }

    expect(error1.error).toBe('Não autorizado')
    expect(error2.errors?.cpf[0]).toBe('CPF inválido')
  })

  it('LoginUrlResponseDTO retorna URL', () => {
    const response: LoginUrlResponseDTO = {
      url: 'https://accounts.google.com/o/oauth2/v2/auth?...',
    }

    expect(response.url).toContain('google.com')
  })
})
