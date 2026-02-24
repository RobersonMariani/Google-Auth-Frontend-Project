<template>
  <div class="register-page">
    <div class="register-page__card">
      <h2 class="register-page__title">Complete seu cadastro</h2>
      <p class="register-page__email">
        E-mail: <strong>{{ email }}</strong>
      </p>

      <div class="register-page__form">
        <AppInput
          v-model="form.name"
          label="Nome completo"
          placeholder="Seu nome"
          :error="errors.name"
          id="name"
          @blur="validateField('name', form.name)"
        />

        <AppInput
          v-model="form.cpf"
          label="CPF"
          placeholder="000.000.000-00"
          :error="errors.cpf"
          id="cpf"
          @input="onCpfInput"
          @blur="validateField('cpf', form.cpf)"
        />

        <AppInput
          v-model="form.birth_date"
          label="Data de nascimento"
          type="date"
          :error="errors.birth_date"
          id="birth_date"
          @blur="validateField('birth_date', form.birth_date)"
        />

        <AppButton :loading="loading" :disabled="loading" @click="handleSubmit">
          Finalizar cadastro
        </AppButton>
      </div>

      <AppToast
        :message="toastMessage"
        :type="toastType"
        :visible="!!toastMessage"
        @close="toastMessage = ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppToast from '@/components/ui/AppToast.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { registerSchema } from '@/schemas/userSchema'
import { completeRegistration } from '@/services/userService'
import { useAuthStore } from '@/stores/authStore'
import { formatCpf, sanitizeCpf } from '@/utils/cpf'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const loading = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error' | 'info'>('error')

const form = reactive({
  name: '',
  cpf: '',
  birth_date: '',
  email: '',
})

const { errors, validate, validateField: _validateField } = useFormValidation(registerSchema)

onMounted(() => {
  email.value = (route.query.email as string) || ''
  form.email = email.value

  if (!email.value) {
    router.push({ name: 'login' })
  }
})

function validateField(field: string, value: unknown) {
  _validateField(field, value, { ...form })
}

function onCpfInput(event: Event) {
  const target = event.target as HTMLInputElement
  form.cpf = formatCpf(target.value)
}

async function handleSubmit() {
  const dataToValidate = { ...form, cpf: sanitizeCpf(form.cpf) }

  if (!validate(dataToValidate)) {
    const firstError = Object.values(errors).find((e) => e)
    if (firstError) {
      toastType.value = 'error'
      toastMessage.value = firstError
    }
    return
  }

  loading.value = true
  toastMessage.value = ''

  try {
    const payload: RegisterUserDTO = {
      name: form.name,
      cpf: sanitizeCpf(form.cpf),
      birth_date: form.birth_date,
      email: form.email,
    }

    const response = await completeRegistration(payload)
    authStore.setToken(response.token)
    toastType.value = 'success'
    toastMessage.value = 'Cadastro realizado com sucesso!'

    setTimeout(() => {
      router.push({ name: 'users' })
    }, 1500)
  } catch (error) {
    toastType.value = 'error'
    toastMessage.value = error instanceof Error ? error.message : 'Erro ao finalizar cadastro.'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  @include flex-center;
  min-height: 80vh;

  &__card {
    @include card;
    max-width: 480px;
    width: 100%;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $text;
    margin-bottom: $spacing-sm;
  }

  &__email {
    font-size: $font-size-sm;
    color: $text-secondary;
    margin-bottom: $spacing-xl;

    strong {
      color: $text;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }
}
</style>
