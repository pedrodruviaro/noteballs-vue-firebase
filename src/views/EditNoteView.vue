<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useNotesStore } from '@/stores/notes'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const noteId = computed(() => route.params.id)

const notesStore = useNotesStore()

const content = ref(notesStore.getNoteContent(noteId.value))
const addEditNoteRef = ref(null)

const saveNote = () => {
  notesStore.updateNote({ id: noteId.value, content: content.value })
  router.push('/')
}

onMounted(() => {
  addEditNoteRef.value.focusTextarea()
})
</script>

<template>
  <div class="edit-note">
    <AddEditNote
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
      ref="addEditNoteRef"
      v-model:content="content"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">Cancel</button>
        <button
          class="button is-link has-background-link"
          @click="saveNote"
          :disabled="content.trim() === ''"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>
