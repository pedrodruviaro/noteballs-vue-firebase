<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import NoteCard from '@/components/Notes/NoteCard.vue'
import { useWatchCharacters } from '@/composables/useWatchCharacters'
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

useWatchCharacters(newNote)
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

    <progress class="progress is-large is-success" v-if="notesStore.loading" />

    <div v-else v-auto-animate>
      <NoteCard v-for="note in notesStore.notes" :key="note.id" :note />
    </div>

    <div v-if="!notesStore.notes.length">
      <p class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes here yet
      </p>
    </div>
  </div>
</template>
