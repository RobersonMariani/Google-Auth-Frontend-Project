<template>
  <div class="user-table-wrapper">
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Cadastrado em</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="5" class="user-table__empty">
            Nenhum usuário encontrado.
          </td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ formatCpfDisplay(user.cpf) }}</td>
          <td>{{ formatDate(user.birth_date) }}</td>
          <td>{{ formatDate(user.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { UserDTO } from '@/dtos/UserDTO'
import { formatCpf } from '@/utils/cpf'

defineProps<{
  users: UserDTO[]
}>()

function formatCpfDisplay(cpf: string): string {
  return formatCpf(cpf)
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR')
}
</script>

<style lang="scss" scoped>
.user-table-wrapper {
  overflow-x: auto;
  border-radius: $radius-md;
  border: 1px solid $border;
}

.user-table {
  background: $bg;
  min-width: 600px;

  th,
  td {
    padding: $spacing-sm $spacing-md;
    text-align: left;
    border-bottom: 1px solid $border-light;
  }

  th {
    background: $bg-secondary;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-secondary;
    white-space: nowrap;
  }

  td {
    font-size: $font-size-sm;
    color: $text;
  }

  tbody tr:hover {
    background: $primary-light;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  &__empty {
    text-align: center !important;
    padding: $spacing-2xl !important;
    color: $text-light;
  }
}
</style>
