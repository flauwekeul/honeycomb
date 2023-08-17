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
  return {
    ...createTraverserStore(initialTraverser),
  }
})
