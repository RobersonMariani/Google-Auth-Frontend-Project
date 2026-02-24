<template>
  <button
    :type="type"
    class="app-button"
    :class="[`app-button--${variant}`, { 'app-button--loading': loading }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="app-button__spinner" />
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  loading?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style lang="scss" scoped>
.app-button {
  @include button-base;

  &--primary {
    background: $primary;
    color: #fff;

    &:hover:not(:disabled) {
      background: $primary-dark;
    }
  }

  &--secondary {
    background: $bg-secondary;
    color: $text;
    border: 1px solid $border;

    &:hover:not(:disabled) {
      background: $border-light;
    }
  }

  &--outline {
    background: transparent;
    color: $primary;
    border: 1px solid $primary;

    &:hover:not(:disabled) {
      background: $primary-light;
    }
  }

  &--loading {
    position: relative;
    color: transparent;
  }

  &__spinner {
    position: absolute;
    width: 18px;
    height: 18px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    color: #fff;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
