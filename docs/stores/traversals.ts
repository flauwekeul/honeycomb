import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTraverserStore } from '../composables'

export const useTraversalsStore = defineStore('traversals', () => {
  const bail = ref(false)

  return {
    ...createTraverserStore(),
    bail,
  }
})
