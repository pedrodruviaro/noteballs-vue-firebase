<script setup>
import NoteCard from '@/components/Notes/NoteCard.vue'
import { v4 as uuiv4 } from 'uuid'
import { ref } from 'vue'

const notes = ref([
  {
    id: 'id1',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ipsa commodi sint ut ullam culpa nulla molestiae sunt quia qui maxime, enim uasi officiis aperiam fugit, corrupti omnis, eaque animi.',
  },
  {
    id: 'id2',
    content: 'Lorem ipsum dolor sit amet consectetur',
  },
])

const newNoteRef = ref()
const newNote = ref('')

const addNote = () => {
  const note = {
    id: uuiv4(),
    content: newNote.value,
  }

  notes.value.unshift(note)

  newNote.value = ''
  newNoteRef.value.focus()
}

const removeNote = id => {
  notes.value = notes.value.filter(note => note.id !== id)
}
</script>

<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Add a new note"
            v-model="newNote"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-success"
            :disabled="newNote.trim() === ''"
            @click="addNote"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <NoteCard v-for="note in notes" :key="note.id" :note @remove="removeNote" />
  </div>
</template>
