<template>
  <div class="login-page">
    <div class="login-page__card">
      <h2 class="login-page__title">Bem-vindo</h2>
      <p class="login-page__subtitle">
        Faça login com sua conta Google para continuar o cadastro.
      </p>
      <GoogleLoginButton :loading="loading" @click="handleLogin" />
      <AppToast
        :message="errorMessage"
        type="error"
        :visible="!!errorMessage"
        @close="errorMessage = ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton.vue'
import AppToast from '@/components/ui/AppToast.vue'
import { getLoginUrl } from '@/services/authService'

const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const url = await getLoginUrl()
    window.location.href = url
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Erro ao conectar com o Google.'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  @include flex-center;
  min-height: 80vh;

  &__card {
    @include card;
    @include flex-center;
    flex-direction: column;
    gap: $spacing-xl;
    max-width: 420px;
    width: 100%;
    text-align: center;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: 700;
    color: $text;
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: 1.5;
  }
}
</style>
