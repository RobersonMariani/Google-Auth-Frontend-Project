import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTable from '@/components/users/UserTable.vue'
import type { UserDTO } from '@/dtos/UserDTO'

const mockUsers: UserDTO[] = [
  {
    id: 1,
    name: 'João Silva',
    cpf: '52998224725',
    birth_date: '1990-05-15',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Maria Santos',
    cpf: '11144477735',
    birth_date: '1985-10-20',
    created_at: '2025-01-02T00:00:00.000Z',
    updated_at: '2025-01-02T00:00:00.000Z',
  },
]

describe('UserTable', () => {
  it('renderiza cabeçalhos da tabela', () => {
    const wrapper = mount(UserTable, {
      props: { users: [] },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(5)
    expect(headers[0].text()).toBe('ID')
    expect(headers[1].text()).toBe('Nome')
    expect(headers[2].text()).toBe('CPF')
    expect(headers[3].text()).toBe('Data de Nascimento')
    expect(headers[4].text()).toBe('Cadastrado em')
  })

  it('exibe mensagem quando não há usuários', () => {
    const wrapper = mount(UserTable, {
      props: { users: [] },
    })

    expect(wrapper.text()).toContain('Nenhum usuário encontrado.')
  })

  it('renderiza dados dos usuários', () => {
    const wrapper = mount(UserTable, {
      props: { users: mockUsers },
    })

    expect(wrapper.text()).toContain('João Silva')
    expect(wrapper.text()).toContain('Maria Santos')
  })

  it('formata CPF corretamente na exibição', () => {
    const wrapper = mount(UserTable, {
      props: { users: mockUsers },
    })

    expect(wrapper.text()).toContain('529.982.247-25')
  })

  it('renderiza número correto de linhas', () => {
    const wrapper = mount(UserTable, {
      props: { users: mockUsers },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)
  })
})
