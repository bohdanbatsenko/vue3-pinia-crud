<script setup>
import {ref} from 'vue';
import Header from '../components/Header.vue';
import TaskForm from '../components/TaskForm.vue';
import TaskDetails from '../components/TaskDetails.vue';
import { useTaskStore } from '../stores/TaskStore';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore()
const { tasks, loading, favs, totalCount, favCount, paginatedTasks, currentPage, totalPages} = storeToRefs(taskStore)

taskStore.loadTasks()

const filter = ref('all');

const prevPage = () => {
  if (currentPage.value > 1) {
    taskStore.setCurrentPage(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    taskStore.setCurrentPage(currentPage.value + 1)
  }
}
</script>

<template>
  <main>
    <Header></Header>
    <div class="new-task-form">
      <TaskForm/>
    </div>
    <nav class="filter">
      <button @click="filter='all'">All tasks</button>
      <button @click="filter='favs'">Fav tasks</button>
    </nav>
    <div class="loading" v-if="loading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks</p>
      <div v-for="task in paginatedTasks">
        <TaskDetails :task="task" key="id"/>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favourite tasks</p>
      <div v-for="task in favs">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div class="actions-wrapper">
      <div class="pagination-wrapper">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          >Prev page</button>
          <span class="current-page">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            v-for="index in totalPages"
            :key="index"
            :aria-label="'go to page ' + index"
            class="page-item"
            :class="{
                'active-page': currentPage === index,
              }"
            @click="taskStore.setCurrentPage(index)"
            >
            <span
              class="page-link"
            >
              {{ index }}
            </span>
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >Next page</button>
      </div>
      <button class="button-reset" @click="taskStore.$reset">Reset</button>   
    </div>
  </main>
</template>

<style scoped>
  
</style>
