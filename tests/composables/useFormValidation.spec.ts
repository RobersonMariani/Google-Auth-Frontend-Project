import { describe, it, expect } from 'vitest'
import { useFormValidation } from '@/composables/useFormValidation'
import { z } from 'zod/v4'

const testSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
})

describe('useFormValidation', () => {
  it('valida dados corretos e retorna true', () => {
    const { validate, isValid } = useFormValidation(testSchema)
    const data = { name: 'João', email: 'joao@email.com' }

    const result = validate(data)

    expect(result).toBe(true)
    expect(isValid.value).toBe(true)
  })

  it('rejeita dados inválidos e popula erros', () => {
    const { validate, errors, isValid } = useFormValidation(testSchema)
    const data = { name: '', email: 'invalido' }

    const result = validate(data)

    expect(result).toBe(false)
    expect(isValid.value).toBe(false)
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
  })

  it('limpa erros ao chamar clearErrors', () => {
    const { validate, errors, clearErrors } = useFormValidation(testSchema)
    validate({ name: '', email: '' })

    clearErrors()

    expect(Object.keys(errors).length).toBe(0)
  })

  it('valida campo individual com validateField', () => {
    const { validateField, errors } = useFormValidation(testSchema)
    const fullData = { name: '', email: 'joao@email.com' }

    validateField('name', '', fullData)

    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeUndefined()
  })

  it('remove erro de campo quando campo fica válido', () => {
    const { validateField, errors } = useFormValidation(testSchema)

    validateField('name', '', { name: '', email: 'a@b.com' })
    expect(errors.name).toBeTruthy()

    validateField('name', 'João', { name: 'João', email: 'a@b.com' })
    expect(errors.name).toBeUndefined()
  })
})
