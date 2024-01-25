
import { computed, ref } from "vue";

export const usePagination = (currentPage, tasksPerPage, arrayToPaginate) => {
  const paginatedTasks = computed(() => {
    const startIndex = (currentPage.value - 1) * tasksPerPage
    const endIndex = startIndex + tasksPerPage
    return arrayToPaginate.value.slice(startIndex, endIndex)
  })

  const totalPages = computed(() => {
    return Math.ceil(arrayToPaginate.value.length / tasksPerPage)
  })
  
  return {
    paginatedTasks,
    totalPages,

  }
}
