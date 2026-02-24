import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton.vue'

describe('GoogleLoginButton', () => {
  it('renderiza com texto padrão', () => {
    const wrapper = mount(GoogleLoginButton)

    expect(wrapper.text()).toContain('Entrar com Google')
  })

  it('mostra texto de carregamento quando loading', () => {
    const wrapper = mount(GoogleLoginButton, {
      props: { loading: true },
    })

    expect(wrapper.text()).toContain('Carregando...')
  })

  it('fica desabilitado quando loading', () => {
    const wrapper = mount(GoogleLoginButton, {
      props: { loading: true },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('emite evento click ao clicar', async () => {
    const wrapper = mount(GoogleLoginButton)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('renderiza o ícone SVG do Google', () => {
    const wrapper = mount(GoogleLoginButton)

    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
