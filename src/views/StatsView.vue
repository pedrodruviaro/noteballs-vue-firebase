<script setup>
import { useWatchCharacters } from '@/composables/useWatchCharacters'
import { vAutoFocus } from '@/directives/vAutoFocus'
import { useNotesStore } from '@/stores/notes'
import { ref } from 'vue'

const notesStore = useNotesStore()

const comment = ref('')

useWatchCharacters(comment)
</script>

<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ notesStore.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ notesStore.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>

    <input
      class="input"
      type="text"
      placeholder="Do you love noteballs?"
      v-auto-focus
      v-model="comment"
    />
  </div>
</template>
