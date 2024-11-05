<script setup>
import NavBar from '@/components/Layout/NavBar.vue'
import { useNotesStore } from '@/stores/notes'
import { onMounted } from 'vue'

const notesStore = useNotesStore()

onMounted(() => notesStore.getNotes())
</script>

<template>
  <div>
    <NavBar />
    <main class="container is-max-desktop px-2 py-4">
      <RouterView />
    </main>
  </div>
</template>
