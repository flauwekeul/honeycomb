import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LineControlProps, RectangleControlProps, RingControlProps, SpiralControlProps, TraverserName } from '../types'

export const useInitialHexesStore = defineStore('initialHexes', () => {
  const name = ref<TraverserName>('rectangle')
  const line = ref<LineControlProps>({
    start: { q: 0, r: 1 },
    stop: { q: 6, r: 6 },
  })
  const rectangle = ref<RectangleControlProps>({
    start: { q: 0, r: 0 },
    width: 10,
    height: 10,
    direction: 'E',
  })
  const ring = ref<RingControlProps>({
    center: { q: 1, r: 3 },
    radius: 3,
    rotation: 'cw',
  })
  const spiral = ref<SpiralControlProps>({
    start: { q: 1, r: 3 },
    radius: 3,
    rotation: 'cw',
  })

  return { name, line, rectangle, ring, spiral }
})
