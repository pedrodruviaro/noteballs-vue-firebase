<script setup>
import { useNotesStore } from '@/stores/notes'
import { onClickOutside } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  noteId: {
    type: String,
    required: true,
  },
})

const visible = defineModel('visible')

const closeModal = () => (visible.value = false)

const notesStore = useNotesStore()

const handleDeleteNote = () => {
  notesStore.removeNote({ id: props.noteId })
  closeModal()
}

// Click Outside
const modalCardRef = ref()
onClickOutside(modalCardRef, closeModal)

// Keyboard Handler
const handleKeyboardEvent = event => {
  if (event.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyboardEvent)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', handleKeyboardEvent)
})
</script>

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="visible = false"></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note?</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="visible = false">Cancel</button>
        <button class="button is-danger" @click="handleDeleteNote">Delete</button>
      </footer>
    </div>
  </div>
</template>
