import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import * as userService from '@/services/userService'
import type { ApiPaginatedResponseDTO } from '@/dtos/ApiResponseDTO'
import type { UserDTO } from '@/dtos/UserDTO'

vi.mock('@/services/userService')

const mockUsers: UserDTO[] = [
  {
    id: 1,
    name: 'João Silva',
    cpf: '52998224725',
    birth_date: '1990-05-15',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-01T00:00:00.000Z',
  },
]

const mockResponse: ApiPaginatedResponseDTO<UserDTO> = {
  message: 'Usuários listados com sucesso.',
  data: mockUsers,
  current_page: 1,
  last_page: 1,
  per_page: 20,
  total: 1,
}

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('carrega usuários com sucesso', async () => {
    vi.mocked(userService.fetchUsers).mockResolvedValue(mockResponse)
    const store = useUserStore()

    await store.loadUsers()

    expect(store.users).toEqual(mockUsers)
    expect(store.pagination.total).toBe(1)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('trata erro ao carregar usuários', async () => {
    vi.mocked(userService.fetchUsers).mockRejectedValue(new Error('Erro de rede'))
    const store = useUserStore()

    await store.loadUsers()

    expect(store.users).toEqual([])
    expect(store.error).toBe('Erro de rede')
    expect(store.loading).toBe(false)
  })

  it('setFilters atualiza filtros e recarrega', async () => {
    vi.mocked(userService.fetchUsers).mockResolvedValue(mockResponse)
    const store = useUserStore()

    store.setFilters('João', '529')

    expect(store.filters.name).toBe('João')
    expect(store.filters.cpf).toBe('529')
    expect(store.pagination.currentPage).toBe(1)
  })

  it('setPage muda a página e recarrega', async () => {
    vi.mocked(userService.fetchUsers).mockResolvedValue(mockResponse)
    const store = useUserStore()

    store.setPage(3)

    expect(store.pagination.currentPage).toBe(3)
    expect(userService.fetchUsers).toHaveBeenCalled()
  })

  it('loading fica true durante o carregamento', async () => {
    let resolvePromise: (value: ApiPaginatedResponseDTO<UserDTO>) => void
    const promise = new Promise<ApiPaginatedResponseDTO<UserDTO>>((resolve) => {
      resolvePromise = resolve
    })
    vi.mocked(userService.fetchUsers).mockReturnValue(promise)
    const store = useUserStore()

    const loadPromise = store.loadUsers()
    expect(store.loading).toBe(true)

    resolvePromise!(mockResponse)
    await loadPromise
    expect(store.loading).toBe(false)
  })
})
