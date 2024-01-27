<template>
  <main>
    <Header />
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
      <button class="button-reset" @click="taskStore.$reset">Reset</button>
      <PaginationComponent 
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="currentPage = $event"
      />
    </div>
  </main>
</template>

<script setup>
import {ref} from 'vue';
import Header from '../components/Header.vue';
import TaskForm from '../components/TaskForm.vue';
import TaskDetails from '../components/TaskDetails.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import { useTaskStore } from '../stores/TaskStore';
import { storeToRefs } from 'pinia';
import { usePagination } from "../composables/usePagination";

const taskStore = useTaskStore()
const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)

taskStore.loadTasks()

const currentPage = ref(1)
const tasksPerPage = 3

const { paginatedTasks, totalPages } = usePagination(
  currentPage,
  tasksPerPage,
  tasks
);

const filter = ref('all');

</script>

