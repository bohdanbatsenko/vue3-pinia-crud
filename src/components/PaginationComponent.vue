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
  currentPage: { required: true },
  totalPages: { required: true },
});
const { currentPage, totalPages } = ref(props)
const emit = defineEmits(["update:currentPage"])
const setCurrentPage = (page) => {
  currentPage = page
  //emit("updateCurrentPage", page)
}
const prevPage = () => {
  if(currentPage.value === 1) return;
  emit("update:currentPage", currentPage.value - 1)
}
const nextPage = () => {
  if(currentPage.value >= totalPages.value) return;
  emit("update:currentPage", currentPage.value + 1)
}
</script>
