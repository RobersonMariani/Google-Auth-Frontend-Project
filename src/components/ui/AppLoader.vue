<template>
  <div class="app-loader">
    <div class="app-loader__spinner" />
    <p v-if="text" class="app-loader__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: '',
})
</script>

<style lang="scss" scoped>
.app-loader {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-2xl;

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid $border-light;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__text {
    font-size: $font-size-sm;
    color: $text-secondary;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
