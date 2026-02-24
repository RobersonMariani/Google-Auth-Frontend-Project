import { z } from 'zod/v4'
import { validateCpf } from '@/utils/cpf'

export const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .refine(validateCpf, 'CPF inválido'),
  birth_date: z.string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine((val) => new Date(val) < new Date(), 'Data deve ser anterior a hoje')
    .refine((val) => new Date(val) > new Date('1900-01-01'), 'Data inválida'),
  email: z.string().email('E-mail inválido'),
})

export type RegisterFormData = z.infer<typeof registerSchema>

export const filtersSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().max(14).optional(),
})

export type FiltersFormData = z.infer<typeof filtersSchema>
