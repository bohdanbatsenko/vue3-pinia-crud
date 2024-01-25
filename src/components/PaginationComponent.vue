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

const emit = defineEmits(["update:currentPage"])
const setCurrentPage = (page) => {
  props.currentPage = page
  emit("update:currentPage", page)
}
const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};
</script>
