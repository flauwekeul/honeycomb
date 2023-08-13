import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  LineControlProps,
  RectangleControlProps,
  RingControlProps,
  SpiralControlProps,
  TraverserControlProps,
} from '../types'

const defaultLineOptions: LineControlProps = {
  start: { q: 0, r: 0 },
  stop: { q: 3, r: 0 },
}
const defaultRectangleOptions: RectangleControlProps = {
  start: { q: 0, r: 0 },
  width: 3,
  height: 3,
  direction: 'E',
}
const defaultRingOptions: RingControlProps = {
  center: { q: 2, r: 3 },
  radius: 2,
  rotation: 'cw',
}
const defaultSpiralOptions: SpiralControlProps = {
  start: { q: 2, r: 3 },
  radius: 2,
  rotation: 'cw',
}

export const useTraversalsStore = defineStore('traversals', () => {
  const traversers = ref<TraverserControlProps[]>([])

  const add = () => {
    traversers.value.push({
      name: 'line',
      line: defaultLineOptions,
      rectangle: defaultRectangleOptions,
      ring: defaultRingOptions,
      spiral: defaultSpiralOptions,
    })
  }

  const update = (index: number, config: Partial<TraverserControlProps>) => {
    traversers.value[index] = { ...traversers.value[index], ...config }
  }

  const moveUp = (index: number) => {
    if (index <= 0) {
      return
    }
    ;[traversers.value[index - 1], traversers.value[index]] = [traversers.value[index], traversers.value[index - 1]]
  }

  const moveDown = (index: number) => {
    if (index >= traversers.value.length - 1) {
      return
    }
    ;[traversers.value[index + 1], traversers.value[index]] = [traversers.value[index], traversers.value[index + 1]]
  }

  // `delete` is a reserved keyword
  const delete_ = (index: number) => {
    traversers.value.splice(index, 1)
  }

  return {
    traversers,
    add,
    update,
    moveUp,
    moveDown,
    delete_,
  }
})
