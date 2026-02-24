import { describe, it, expect } from 'vitest'
import { registerSchema, filtersSchema } from '@/schemas/userSchema'
import { z } from 'zod/v4'

describe('registerSchema', () => {
  const validData = {
    name: 'João Silva',
    cpf: '52998224725',
    birth_date: '1990-05-15',
    email: 'joao@email.com',
  }

  it('valida dados corretos', () => {
    const result = z.safeParse(registerSchema, validData)

    expect(result.success).toBe(true)
  })

  it('rejeita nome vazio', () => {
    const data = { ...validData, name: '' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita nome muito longo', () => {
    const data = { ...validData, name: 'a'.repeat(256) }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita CPF inválido', () => {
    const data = { ...validData, cpf: '11111111111' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita CPF curto', () => {
    const data = { ...validData, cpf: '123' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita data de nascimento futura', () => {
    const data = { ...validData, birth_date: '2099-01-01' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita data de nascimento anterior a 1900', () => {
    const data = { ...validData, birth_date: '1899-12-31' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita data de nascimento vazia', () => {
    const data = { ...validData, birth_date: '' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita email inválido', () => {
    const data = { ...validData, email: 'invalido' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })

  it('rejeita email vazio', () => {
    const data = { ...validData, email: '' }

    const result = z.safeParse(registerSchema, data)

    expect(result.success).toBe(false)
  })
})

describe('filtersSchema', () => {
  it('valida filtros corretos', () => {
    const data = { name: 'João', cpf: '529.982' }

    const result = z.safeParse(filtersSchema, data)

    expect(result.success).toBe(true)
  })

  it('valida filtros vazios (opcionais)', () => {
    const result = z.safeParse(filtersSchema, {})

    expect(result.success).toBe(true)
  })

  it('rejeita CPF muito longo no filtro', () => {
    const data = { cpf: '123456789012345' }

    const result = z.safeParse(filtersSchema, data)

    expect(result.success).toBe(false)
  })
})
