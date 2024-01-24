import { defineStore } from 'pinia'

export const useTaskStore =  defineStore('taskStore', {
  state: () => ({
    tasks: [
      // {id: 1, title: "buy some milk", isFav: false, isEdit: false},
      // {id: 2, title: "play Gloomhaven", isFav: true, isEdit: false},
      // {id: 3, title: "walk the moon", isFav: false, isEdit: false},
      // {id: 4, title: "do cleaning", isFav: true, isEdit: false},
    ],
    loading: false,
    currentPage: 1,
    tasksPerPage: 3
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
    totalCount:(state) => {
      return state.tasks.length
    },
    paginatedTasks: (state) => {
      const startIndex = (state.currentPage - 1) * state.tasksPerPage
      const endIndex = startIndex + state.tasksPerPage
      return state.tasks.slice(startIndex, endIndex)
    },
    totalPages: (state) => {
      return Math.ceil(state.tasks.length / state.tasksPerPage)
    }
  },
  actions: {
    async loadTasks() {
      try {
        this.loading = true
        const res = await fetch('http://localhost:3000/tasks')
        // const res = await fetch('http://localhost:3000/tasks?' + new URLSearchParams({
        //   _page: 1,
        //   _limit: 3
        // }))
        const data = await res.json()
        this.tasks = data
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
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      const res = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {'Content-Type': 'application/json'}
        }
      )
      if (res.error) {
        console.log(res.error);
      }
    },
    async removeTask(id) {
      this.tasks = this.tasks.filter(t=> {
        return t.id !== id
      })
      localStorage.setItem('tasks', JSON.stringify(this.todos))
      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      }
    )
    if (res.error) {
      console.log(res.error);
    }
    },
    async toggleFav(id) {
      const task = this.tasks.find(t => t.id === id)
      task.isFav = !task.isFav

      const res = await fetch('http://localhost:3000/tasks/' + id, {
          method: 'PATCH',
          body: JSON.stringify({isFav: task.isFav}),
          headers: {'Content-Type': 'application/json'}
        }
      )
      if (res.error) {
        console.log(res.error);
      }      
    },
    async updateTask(id, updatedTask){
      const task = this.tasks.find(t => t.id === id)
      task.isEdit = !task.isEdit
      task.title = updatedTask

      const res = await fetch('http://localhost:3000/tasks/' + id, {
          method: 'PUT',
          body: JSON.stringify({title: task.title}),
          headers: {'Content-Type': 'application/json'}
        }
      )
      if (res.error) {
        console.log(res.error);
      }   
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    setCurrentPage(page){
      this.currentPage = page;
    },
  }
})