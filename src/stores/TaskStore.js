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
        // const res = await fetch('http://localhost:3000/tasks')
        // const data = await res.json()
        // this.tasks = data
        this.tasks = await apiLoadTasks()
        this.loading = false
      } catch(error) {
        console.error('Error fetching tasks:', error);
      }

      const storedTasksString = localStorage.getItem('tasks')
      if (storedTasksString) {
        const storedTasks = JSON.parse(storedTasksString)
        this.tasks = storedTasks
        console.log(this.tasks)
      }
    },
    async addTask(task){
      this.tasks.push(task)
      await apiAddTask(task)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      // const res = await fetch('http://localhost:3000/tasks', {
      //     method: 'POST',
      //     body: JSON.stringify(task),
      //     headers: {'Content-Type': 'application/json'}
      //   }
      // )
      // if (res.error) {
      //   console.log(res.error);
      // }
    },
    async removeTask(id) {
      try {
        await apiRemoveTask(id)
        this.tasks = this.tasks.filter(t=> {
          return t.id !== id
        })      
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
        // const res = await fetch('http://localhost:3000/tasks/' + id, {
        //   method: 'DELETE',
        //   }
        // )
        // if (res.error) {
        //   console.log(res.error);
        // }        
      } catch(error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async toggleFav(id, task) {
      try {
        const task = this.tasks.find(t => t.id === id)
        task.isFav = !task.isFav
        await apiToggleFav(id, task)
        
      //   const res = await fetch('http://localhost:3000/tasks/' + id, {
      //       method: 'PATCH',
      //       body: JSON.stringify({isFav: task.isFav}),
      //       headers: {'Content-Type': 'application/json'}
      //     }
      //   )
      //   if (res.error) {
      //     console.log(res.error);
      //   }  
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
        // const res = await fetch('http://localhost:3000/tasks/' + id, {
        //     method: 'PUT',
        //     body: JSON.stringify({title: task.title}),
        //     headers: {'Content-Type': 'application/json'}
        //   }
        // )
        // if (res.error) {
        //   console.log(res.error);
        // }   
        localStorage.setItem('tasks', JSON.stringify(this.tasks))        
      } catch(error) {
        console.error('Error fetching tasks:', error);
      }
    }
  }
})