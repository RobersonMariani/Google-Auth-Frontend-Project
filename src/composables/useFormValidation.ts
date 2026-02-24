import { reactive, ref } from 'vue'
import type { ZodType } from 'zod/v4'
import { z } from 'zod/v4'

export function useFormValidation<T>(schema: ZodType<T>) {
  const errors = reactive<Record<string, string>>({})
  const isValid = ref(false)

  function clearErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
  }

  function extractErrors(zodError: z.ZodError) {
    for (const issue of zodError.issues) {
      const path = issue.path
      if (path.length > 0) {
        const key = String(path[0])
        if (!errors[key]) {
          errors[key] = issue.message
        }
      }
    }
  }

  function validate(data: unknown): data is T {
    clearErrors()
    const result = z.safeParse(schema, data)

    if (result.success) {
      isValid.value = true
      return true
    }

    isValid.value = false
    extractErrors(result.error)

    return false
  }

  function validateField(field: string, value: unknown, fullData: Record<string, unknown>) {
    const data = { ...fullData, [field]: value }
    const result = z.safeParse(schema, data)

    delete errors[field]

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path.length > 0 && String(issue.path[0]) === field) {
          errors[field] = issue.message
          break
        }
      }
    }
  }

  return { errors, isValid, validate, validateField, clearErrors }
}
