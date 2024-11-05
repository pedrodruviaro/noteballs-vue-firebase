import { acceptHMRUpdate, defineStore } from 'pinia'
import { db } from '@/libs/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'

const notesCollectionRef = collection(db, 'notes')

export const useNotesStore = defineStore('notes', {
  state: () => {
    return {
      notes: [],
      loading: false,
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
    async getNotes() {
      this.loading = true

      const q = query(notesCollectionRef, orderBy('createdAt', 'desc'))

      onSnapshot(q, querySnapshot => {
        const notes = []
        querySnapshot.forEach(doc => {
          const note = {
            id: doc.id,
            ...doc.data(),
          }

          notes.push(note)
        })

        this.notes = notes
        this.loading = false
      })

      // https://firebase.google.com/docs/firestore/query-data/listen?hl=pt-br#view_changes_between_snapshots
      // @TODO -> unsubscibe
    },

    async addNote({ content }) {
      await addDoc(notesCollectionRef, {
        content,
        createdAt: new Date().toISOString(),
      })
    },

    async removeNote({ id }) {
      await deleteDoc(doc(notesCollectionRef, id))
    },

    async updateNote({ id, content }) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
