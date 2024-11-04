<script setup>
import NavBar from '@/components/Layout/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <main class="container is-max-desktop px-2 py-4">
      <RouterView />
    </main>
  </div>
</template>
