<template>
  <div class="app-input" :class="{ 'app-input--error': error }">
    <label v-if="label" :for="id" class="app-input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="app-input__field"
      @input="onInput"
      @blur="$emit('blur')"
    />
    <span v-if="error" class="app-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  id?: string
}>(), {
  type: 'text',
  label: '',
  placeholder: '',
  error: '',
  disabled: false,
  id: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  &__label {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text;
  }

  &__field {
    @include input-base;
  }

  &__error {
    font-size: $font-size-xs;
    color: $error;
  }

  &--error .app-input__field {
    border-color: $error;

    &:focus {
      box-shadow: 0 0 0 2px rgba($error, 0.2);
    }
  }
}
</style>
