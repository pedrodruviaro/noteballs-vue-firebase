import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuiv4 } from 'uuid'
import { db } from '@/libs/firebase'

export const useNotesStore = defineStore('notes', {
  state: () => {
    return {
      notes: [],
    }
  },

  getters: {
    getNoteContent: state => {
      return id => {
        return state.notes.find(note => note.id === id).content
      }
    },
    totalNotesCount: state => state.notes.length,

    totalCharactersCount: state => {
      return state.notes.reduce((acc, current) => {
        return (acc += current.content.length)
      }, 0)
    },
  },

  actions: {
    addNote({ content }) {
      const note = {
        id: uuiv4(),
        content,
      }
      this.notes.unshift(note)
    },
    removeNote({ id }) {
      this.notes = this.notes.filter(note => note.id !== id)
    },
    updateNote({ id, content }) {
      const note = this.notes.find(note => note.id === id)
      if (!note) return
      note.content = content
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
