<script setup>
import { vAutoFocus } from '@/directives/vAutoFocus'
import { ref } from 'vue'

const props = defineProps({
  bgColor: {
    type: String,
    default: 'success',
  },
  placeholder: {
    type: String,
    default: 'Type something...',
  },
  label: {
    type: String,
  },
})

const content = defineModel('content')

const textareaRef = ref(null)
const focusTextarea = () => {
  textareaRef.value.focus()
}

defineExpose({
  focusTextarea,
})
</script>

<template>
  <div class="card p-4 mb-5" :class="`has-background-${props.bgColor}-dark`">
    <label v-if="props.label" class="label has-text-white">
      {{ props.label }}
    </label>

    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          ref="textareaRef"
          v-auto-focus
          v-model="content"
          :placeholder="props.placeholder"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
