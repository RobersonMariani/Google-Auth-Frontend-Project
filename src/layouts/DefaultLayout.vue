<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__container">
        <h1 class="layout__title">Google Auth</h1>
      </div>
    </header>
    <main class="layout__main">
      <div class="layout__container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    background: $bg;
    border-bottom: 1px solid $border;
    padding: $spacing-md 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    width: 100%;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: 500;
    color: $text;
  }

  &__main {
    flex: 1;
    padding: $spacing-2xl 0;
  }
}
</style>
