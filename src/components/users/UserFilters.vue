<template>
  <div class="user-filters">
    <AppInput
      v-model="nameFilter"
      label="Filtrar por nome"
      placeholder="Digite o nome..."
      id="filter-name"
    />
    <AppInput
      v-model="cpfFilter"
      label="Filtrar por CPF"
      placeholder="000.000.000-00"
      id="filter-cpf"
      @input="onCpfInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useDebounce } from '@/composables/useDebounce'
import { formatCpf } from '@/utils/cpf'

const emit = defineEmits<{
  filter: [name: string, cpf: string]
}>()

const nameFilter = ref('')
const cpfFilter = ref('')

const debouncedName = useDebounce(nameFilter, 400)
const debouncedCpf = useDebounce(cpfFilter, 400)

watch([debouncedName, debouncedCpf], ([name, cpf]) => {
  emit('filter', name, cpf)
})

function onCpfInput(event: Event) {
  const target = event.target as HTMLInputElement
  cpfFilter.value = formatCpf(target.value)
}
</script>

<style lang="scss" scoped>
.user-filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  margin-bottom: $spacing-xl;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}
</style>
