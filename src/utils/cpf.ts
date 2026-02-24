export function sanitizeCpf(cpf: string): string {
  return cpf.replace(/\D/g, '')
}

export function formatCpf(cpf: string): string {
  const digits = sanitizeCpf(cpf)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
}

export function validateCpf(value: string): boolean {
  const cpf = sanitizeCpf(value)

  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false

  for (let t = 9; t < 11; t++) {
    let sum = 0
    for (let i = 0; i < t; i++) {
      sum += parseInt(cpf.charAt(i)) * (t + 1 - i)
    }
    const remainder = (sum * 10) % 11
    const digit = remainder === 10 ? 0 : remainder
    if (digit !== parseInt(cpf.charAt(t))) return false
  }

  return true
}
