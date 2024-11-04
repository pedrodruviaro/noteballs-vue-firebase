<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    required: true,
    type: Object,
  },
})

const noteLengthCalc = computed(() => {
  const contentLenght = props.note.content.length
  return contentLenght === 1
    ? `${contentLenght} character`
    : `${contentLenght} characters`
})

const emits = defineEmits(['remove'])

const handleDeleteClicked = () => {
  emits('remove', props.note.id)
}
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
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClicked"
        >Delete</a
      >
    </footer>
  </div>
</template>
