<template>
  <div class="task">
    <h2 v-if="!task.isEdit">{{ task.title }}</h2>
    <div v-else class="form-control" :class="{invalid: taskTitleValidity === 'invalid'}">
      <label for="editTaskInput">Enter task title</label>
      <input
      id="editTaskInput"
      name="editTaskInput"
      type="text" 
      v-model="updatedTask" 
      ref="editInput" 
      @keyup.enter="saveTask(task)"
      @keyup.esc="exitEdit(task)"
      @blur="validateInput"
    >      
    </div>
    <p 
      v-if="taskTitleValidity === 'invalid'" 
      :class="{invalid: taskTitleValidity === 'invalid'}"
      >
      Please enter a valid title</p>
    <div class="icons">
      <button
      v-if="!task.isEdit"
        @click="toggleEditTask(task)"
      ><i class="material-icons">edit</i>
    </button>
    <button
      v-else
      @click="saveTask(task)"
      ><i class="material-icons">save</i>
    </button>
      <i 
        @click="taskStore.removeTask(task.id)"
        class="material-icons"
      >delete</i>
      <i 
        class="material-icons"
        :class="{active: task.isFav}" 
        @click="taskStore.toggleFav(task.id)">
        favorite
      </i>
    </div>
  </div>
</template>

<script setup>
  defineProps(['task'])
  import { ref, nextTick } from 'vue';
  import { useTaskStore } from '../stores/TaskStore';
  const taskStore = useTaskStore()
  const updatedTask = ref('')
  const editInput = ref(null)
  const initialTitle = ref('');
  const taskTitleValidity = ref('pending')

  const toggleEditTask = async (task) => {
    task.isEdit = true;
    initialTitle.value = task.title;
    await nextTick();
    editInput.value.focus();
    updatedTask.value = task.title
  }

  const saveTask = (task) => {
    const id = task.id;
    task.title = updatedTask;
    if (updatedTask.value.trim().length !== 0) {
      taskStore.updateTask(id, updatedTask)
    } else {
      taskTitleValidity.value = 'invalid'
    }
  }

  const exitEdit = (task) => {
    task.isEdit = false;
    task.title = initialTitle.value
  }

  const validateInput = () => {
    if (updatedTask.value.trim() === '') {
      taskTitleValidity.value = 'invalid'
    } else {
      taskTitleValidity.value = 'valid'
    }
  }
</script>
