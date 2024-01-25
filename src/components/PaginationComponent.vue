<template>
  <div class="pagination-wrapper">
    <button 
      @click="prevPage" 
      :disabled="currentPage === 1"
      >Prev page</button>
      <span class="current-page">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >Next page</button>
  </div>
</template>
<script setup>
import { ref, toRefs } from 'vue';
const props = defineProps({
  tasksPerPage: { required: true, type: Number },
  modelValue: { required: true, type: Number },
  totalPages: { required: true },
});
const { tasksPerPage, modelValue:currentPage, totalPages } = ref(props)
const emit = defineEmits(["update:modelValue"])
const setCurrentPage = (page) => {
  currentPage.value = page
  //emit("updateCurrentPage", page)
}
const prevPage = () => {
  if(currentPage.value === 1) return;
  emit("update:modelValue", currentPage.value - 1)
}
const nextPage = () => {
  if(currentPage.value >= totalPages.value) return;
  emit("update:modelValue", currentPage.value + 1)
}
</script>
