<script setup>
import DeleteNoteModal from '@/components/Notes/DeleteNoteModal.vue'
import { computed, reactive } from 'vue'

const props = defineProps({
  note: {
    required: true,
    type: Object,
  },
})

const noteLengthCalc = computed(() => {
  const contentLenght = props.note.content.length
  return contentLenght === 1 ? `${contentLenght} character` : `${contentLenght} characters`
})

const modals = reactive({
  deleteNote: false,
})
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">{{ props.note.content }}</div>
      <div class="has-text-right has-text-grey-light mt-2">
        <small>{{ noteLengthCalc }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${props.note.id}`" class="card-footer-item">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
    </footer>

    <!-- Modal -->
    <DeleteNoteModal
      v-if="modals.deleteNote"
      v-model:visible="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>
