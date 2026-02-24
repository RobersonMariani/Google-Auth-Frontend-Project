import { formatCpf } from './cpf'

export function applyCpfMask(event: Event): string {
  const input = event.target as HTMLInputElement
  const formatted = formatCpf(input.value)
  input.value = formatted
  return formatted
}
