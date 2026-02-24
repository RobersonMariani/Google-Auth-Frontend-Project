import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { UserDTO } from '@/dtos/UserDTO'
import { fetchUsers } from '@/services/userService'
import { sanitizeCpf } from '@/utils/cpf'

export const useUserStore = defineStore('users', () => {
  const users = ref<UserDTO[]>([])
  const loading = ref(false)
  const error = ref('')

  const filters = reactive({
    name: '',
    cpf: '',
  })

  const pagination = reactive({
    currentPage: 1,
    lastPage: 1,
    perPage: 20,
    total: 0,
  })

  async function loadUsers() {
    loading.value = true
    error.value = ''

    try {
      const cpfDigits = filters.cpf ? sanitizeCpf(filters.cpf) : undefined

      const response = await fetchUsers({
        name: filters.name || undefined,
        cpf: cpfDigits || undefined,
        per_page: pagination.perPage,
        page: pagination.currentPage,
      })

      users.value = response.data
      pagination.currentPage = response.current_page
      pagination.lastPage = response.last_page
      pagination.perPage = response.per_page
      pagination.total = response.total
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar usuários.'
      users.value = []
    } finally {
      loading.value = false
    }
  }

  function setFilters(name: string, cpf: string) {
    filters.name = name
    filters.cpf = cpf
    pagination.currentPage = 1
    loadUsers()
  }

  function setPage(page: number) {
    pagination.currentPage = page
    loadUsers()
  }

  return {
    users,
    loading,
    error,
    filters,
    pagination,
    loadUsers,
    setFilters,
    setPage,
  }
})
