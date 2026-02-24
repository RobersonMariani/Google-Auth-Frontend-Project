import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserFilters from '@/components/users/UserFilters.vue'

vi.mock('@/composables/useDebounce', () => ({
  useDebounce: (source: { value: string }) => source,
}))

describe('UserFilters', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza dois campos de input', () => {
    const wrapper = mount(UserFilters)

    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(2)
  })

  it('emite evento filter quando nome muda', async () => {
    const wrapper = mount(UserFilters)
    const nameInput = wrapper.find('#filter-name')

    await nameInput.setValue('João')

    expect(wrapper.emitted('filter')).toBeTruthy()
  })

  it('exibe labels corretas', () => {
    const wrapper = mount(UserFilters)

    expect(wrapper.text()).toContain('Filtrar por nome')
    expect(wrapper.text()).toContain('Filtrar por CPF')
  })
})
