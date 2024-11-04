import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/NotesView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: HomeView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/views/StatsView.vue'),
    },
    {
      path: '/editNote/:id',
      name: 'edit-note',
      component: () => import('@/views/EditNoteView.vue'),
    },
  ],
})
