import { describe, it, expect } from 'vitest'
import { validateCpf, formatCpf, sanitizeCpf } from '@/utils/cpf'

describe('sanitizeCpf', () => {
  it('remove pontos e traço do CPF formatado', () => {
    const input = '123.456.789-09'

    const result = sanitizeCpf(input)

    expect(result).toBe('12345678909')
  })

  it('retorna string vazia para entrada vazia', () => {
    const result = sanitizeCpf('')

    expect(result).toBe('')
  })

  it('remove caracteres não numéricos', () => {
    const result = sanitizeCpf('abc123def456')

    expect(result).toBe('123456')
  })
})

describe('formatCpf', () => {
  it('formata CPF completo com pontos e traço', () => {
    const result = formatCpf('12345678909')

    expect(result).toBe('123.456.789-09')
  })

  it('formata parcialmente com 3 dígitos', () => {
    const result = formatCpf('123')

    expect(result).toBe('123')
  })

  it('formata parcialmente com 6 dígitos', () => {
    const result = formatCpf('123456')

    expect(result).toBe('123.456')
  })

  it('formata parcialmente com 9 dígitos', () => {
    const result = formatCpf('123456789')

    expect(result).toBe('123.456.789')
  })

  it('aceita CPF já formatado e reformata corretamente', () => {
    const result = formatCpf('123.456.789-09')

    expect(result).toBe('123.456.789-09')
  })
})

describe('validateCpf', () => {
  it('valida CPF correto (somente dígitos)', () => {
    const result = validateCpf('52998224725')

    expect(result).toBe(true)
  })

  it('valida CPF correto (formatado)', () => {
    const result = validateCpf('529.982.247-25')

    expect(result).toBe(true)
  })

  it('rejeita CPF com dígitos repetidos', () => {
    const result = validateCpf('11111111111')

    expect(result).toBe(false)
  })

  it('rejeita CPF com tamanho incorreto', () => {
    const result = validateCpf('1234567')

    expect(result).toBe(false)
  })

  it('rejeita CPF com dígito verificador inválido', () => {
    const result = validateCpf('52998224720')

    expect(result).toBe(false)
  })

  it('rejeita string vazia', () => {
    const result = validateCpf('')

    expect(result).toBe(false)
  })
})
