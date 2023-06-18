<script lang="ts" setup>
import IconBrand from './icons/IconBrand.vue';
</script>

<template>
  <div>
    <header class="fixed-top">
      <nav class="navbar bg-dark border-bottom border-bottom border-primary" data-bs-theme="dark">
        <div class="container-fluid">
          <router-link to="/" class="navbar-brand d-flex align-items-center">
            <IconBrand />
            <span class="ps-2">Crypto App</span>
          </router-link>
        </div>
      </nav>
    </header>
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<style>
.main {
  margin-top: 57px;
}
</style>
