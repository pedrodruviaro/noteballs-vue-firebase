<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import NoteCard from '@/components/Notes/NoteCard.vue'
import { useNotesStore } from '@/stores/notes'
import { ref } from 'vue'

const notesStore = useNotesStore()

const addEditNoteRef = ref(null)
const newNote = ref('')

const addNote = () => {
  notesStore.addNote({ content: newNote.value })

  newNote.value = ''
  addEditNoteRef.value.focusTextarea()
}
</script>

<template>
  <div class="notes">
    <AddEditNote
      bgColor="success"
      placeholder="Add a new note"
      label="Add New Note"
      ref="addEditNoteRef"
      v-model:content="newNote"
    >
      <template #buttons>
        <button
          class="button is-link has-background-success"
          :disabled="newNote.trim() === ''"
          @click="addNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <div v-auto-animate>
      <NoteCard v-for="note in notesStore.notes" :key="note.id" :note />
    </div>
  </div>
</template>
