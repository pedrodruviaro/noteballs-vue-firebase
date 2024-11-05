import { watch } from 'vue'

export function useWatchCharacters(value, limit = 100) {
  watch(value, newValue => {
    if (newValue.length === limit) {
      alert(`Only ${limit} characters allowed`)
    }
  })
}
