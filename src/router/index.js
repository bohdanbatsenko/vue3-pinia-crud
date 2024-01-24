import Main from '../pages/Main.vue'
import TaskPage from '../pages/TaskPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskPage
    }  
  ]
})

export default router