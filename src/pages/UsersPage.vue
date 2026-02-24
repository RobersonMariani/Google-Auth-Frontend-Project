<template>
  <div class="users-page">
    <h2 class="users-page__title">Usuários Cadastrados</h2>

    <UserFilters @filter="onFilter" />

    <AppLoader v-if="store.loading" text="Carregando usuários..." />

    <template v-else>
      <AppToast
        :message="store.error"
        type="error"
        :visible="!!store.error"
        @close="store.error = ''"
      />

      <UserTable :users="store.users" />

      <UserPagination
        :current-page="store.pagination.currentPage"
        :last-page="store.pagination.lastPage"
        :total="store.pagination.total"
        @page-change="store.setPage"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import UserFilters from '@/components/users/UserFilters.vue'
import UserTable from '@/components/users/UserTable.vue'
import UserPagination from '@/components/users/UserPagination.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppToast from '@/components/ui/AppToast.vue'

const store = useUserStore()

onMounted(() => {
  store.loadUsers()
})

function onFilter(name: string, cpf: string) {
  store.setFilters(name, cpf)
}
</script>

<style lang="scss" scoped>
.users-page {
  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $text;
    margin-bottom: $spacing-xl;
  }
}
</style>
