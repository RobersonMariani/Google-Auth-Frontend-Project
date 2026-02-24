<template>
  <Transition name="toast">
    <div v-if="visible" class="app-toast" :class="`app-toast--${type}`">
      <p class="app-toast__message">{{ message }}</p>
      <button class="app-toast__close" @click="$emit('close')">&times;</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  type: 'success' | 'error' | 'info'
  visible: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style lang="scss" scoped>
.app-toast {
  position: fixed;
  top: $spacing-lg;
  right: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  box-shadow: $shadow-lg;
  z-index: 1000;
  max-width: 400px;

  &--success {
    background: $success;
    color: #fff;
  }

  &--error {
    background: $error;
    color: #fff;
  }

  &--info {
    background: $primary;
    color: #fff;
  }

  &__message {
    font-size: $font-size-sm;
    flex: 1;
  }

  &__close {
    background: none;
    border: none;
    color: inherit;
    font-size: $font-size-xl;
    cursor: pointer;
    line-height: 1;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
