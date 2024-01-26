import { defineStore } from 'pinia'
import { apiLoadTasks, apiAddTask, apiRemoveTask, apiToggleFav, apiUpdateTask } from '../services/api'

export const useTaskStore =  defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false
  }),
  getters: {
    favs(){
      return this.tasks.filter(t => t.isFav)
    },
    favCount(){
      return this.tasks.reduce((p, c)=> {
        return c.isFav ? p + 1 : p
      }, 0)
    },
  },
  actions: {
    async loadTasks() {
      try {
        this.loading = true
        this.tasks = await apiLoadTasks()
        this.loading = false
      } catch(error) {
        console.error('Error fetching tasks:', error);
      }
      const storedTasksString = localStorage.getItem('tasks')
      if (storedTasksString) {
        const storedTasks = JSON.parse(storedTasksString)
        this.tasks = storedTasks
      }
    },
    async addTask(task){
      this.tasks.push(task)
      await apiAddTask(task)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    async removeTask(id) {
      try {
        await apiRemoveTask(id)
        this.tasks = this.tasks.filter(t=> {
          return t.id !== id
        })      
        localStorage.setItem('tasks', JSON.stringify(this.tasks))     
      } catch(error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async toggleFav(id) {
      try {
        const task = this.tasks.find(t => t.id === id)
        task.isFav = !task.isFav
        const taskToFav = {
          isFav: task.isFav
        }
        await apiToggleFav(id, taskToFav)
        
        localStorage.setItem('tasks', JSON.stringify(this.tasks)) 
      }  catch(error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async updateTask(id, updatedTask){
      try {
        const task = this.tasks.find(t => t.id === id)
        task.isEdit = false
        task.title = updatedTask
        const taskToUpdate = {
          title: task.title,
          isFav: task.isFav,
          id: task.id,
          isEdit: task.isEdit
        }

        await apiUpdateTask(id, taskToUpdate)
        localStorage.setItem('tasks', JSON.stringify(this.tasks))        
      } catch(error) {
        console.error('Error fetching tasks:', error);
      }
    }
  }
})