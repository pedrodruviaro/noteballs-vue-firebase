<script setup>
import DeleteNoteModal from '@/components/Notes/DeleteNoteModal.vue'
import { useDateFormat } from '@vueuse/core'
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

const formatedDate = computed(() => {
  return useDateFormat(new Date(props.note.createdAt), 'YYYY-MM-DD')
})
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">{{ props.note.content }}</div>
      <div class="columns is-mobile has-text-grey-light mt-2">
        <small class="column">
          {{ formatedDate }}
        </small>

        <small class="column has-text-right">{{ noteLengthCalc }}</small>
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
