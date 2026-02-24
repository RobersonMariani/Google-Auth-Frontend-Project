<template>
  <div v-if="lastPage > 1" class="pagination">
    <button
      class="pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('page-change', currentPage - 1)"
    >
      &laquo; Anterior
    </button>

    <span class="pagination__info">
      Página {{ currentPage }} de {{ lastPage }}
      <span class="pagination__total">({{ total }} registros)</span>
    </span>

    <button
      class="pagination__btn"
      :disabled="currentPage >= lastPage"
      @click="$emit('page-change', currentPage + 1)"
    >
      Próxima &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  lastPage: number
  total: number
}>()

defineEmits<{
  'page-change': [page: number]
}>()
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;
  margin-top: $spacing-xl;
  flex-wrap: wrap;

  &__btn {
    @include button-base;
    background: $bg;
    color: $primary;
    border: 1px solid $border;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;

    &:hover:not(:disabled) {
      background: $primary-light;
    }

    &:disabled {
      color: $text-light;
    }
  }

  &__info {
    font-size: $font-size-sm;
    color: $text-secondary;
  }

  &__total {
    color: $text-light;
  }
}
</style>
