import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTraverserStore } from '../composables'

const defaults = {
  bail: false,
} as const

export const useTraversalsStore = defineStore('traversals', () => {
  const store = createTraverserStore()
  const bail = ref<boolean>(defaults.bail)

  const reset = () => {
    store.initialize()
    bail.value = defaults.bail
  }

  return {
    ...store,
    bail,
    reset,
  }
})
