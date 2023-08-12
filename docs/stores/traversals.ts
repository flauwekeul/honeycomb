import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LineControlProps, RectangleControlProps, RingControlProps, SpiralControlProps, TraverserName } from '../types'

export const useTraversalsStore = defineStore('traversals', () => {
  const name = ref<TraverserName>('line')
  const line = ref<LineControlProps>({
    start: { q: 8, r: 1 },
    stop: { q: -3, r: 8 },
  })
  const rectangle = ref<RectangleControlProps>({
    start: { q: 4, r: 8 },
    width: 8,
    height: 8,
    direction: 'W',
  })
  const ring = ref<RingControlProps>({
    center: { q: 2, r: 4 },
    radius: 2,
    rotation: 'cw',
  })
  const spiral = ref<SpiralControlProps>({
    start: { q: 3, r: 6 },
    radius: 2,
    rotation: 'ccw',
  })

  return { name, line, rectangle, ring, spiral }
})
