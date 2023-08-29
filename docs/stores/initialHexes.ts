import { defineStore } from 'pinia'
import { PartialTraverserConfig, createTraverserStore } from '../composables'

const initialTraverser: PartialTraverserConfig = {
  name: 'rectangle',
  rectangle: {
    start: { q: 0, r: 0 },
    width: 10,
    height: 10,
    direction: 'E',
  },
}

export const useInitialHexesStore = defineStore('initialHexes', () => {
  const store = createTraverserStore(initialTraverser)

  const reset = () => store.initialize(initialTraverser)

  return {
    ...store,
    reset,
  }
})
