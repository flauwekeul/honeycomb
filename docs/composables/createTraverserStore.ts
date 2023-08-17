import { ref } from 'vue'
import {
  LineControlProps,
  RectangleControlProps,
  RingControlProps,
  SpiralControlProps,
  TraverserControlProps,
  TraverserName,
} from '../types'

const traverserConfig: TraverserControlProps = {
  name: 'line',
  line: {
    start: { q: 0, r: 0 },
    stop: { q: 3, r: 0 },
  },
  rectangle: {
    start: { q: 0, r: 0 },
    width: 3,
    height: 3,
    direction: 'E',
  },
  ring: {
    center: { q: 1, r: 2 },
    radius: 2,
    rotation: 'cw',
  },
  spiral: {
    start: { q: 1, r: 2 },
    radius: 2,
    rotation: 'cw',
  },
}

export interface PartialTraverserConfig {
  name: TraverserName
  line?: LineControlProps
  rectangle?: RectangleControlProps
  ring?: RingControlProps
  spiral?: SpiralControlProps
}

export const createTraverserStore = (initialTraverser?: PartialTraverserConfig) => {
  const traversers = ref<TraverserControlProps[]>([])

  if (initialTraverser) {
    traversers.value.push({ ...traverserConfig, ...initialTraverser })
  }

  const add = () => {
    traversers.value.push(traverserConfig)
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
}
