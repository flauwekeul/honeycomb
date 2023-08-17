import { createTraverserStore } from './createTraverserStore'

export const useInitialHexesStore = createTraverserStore('initialHexes', [
  {
    name: 'rectangle',
    rectangle: {
      start: { q: 0, r: 0 },
      width: 10,
      height: 10,
      direction: 'E',
    },
  },
])
