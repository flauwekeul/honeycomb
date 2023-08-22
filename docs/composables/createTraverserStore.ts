import { ref } from 'vue'
import {
  LineAsVectorProps,
  LineBetweenProps,
  OpposingCornersControlProps,
  RectangleControlProps,
  RingControlProps,
  RingFromRadiusControlProps,
  SpiralControlProps,
  TraverserControlProps,
  TraverserName,
} from '../types'

const traverserConfig: TraverserControlProps = {
  name: 'lineBetween',
  lineBetween: {
    start: { q: 0, r: 0 },
    stop: { q: 3, r: 0 },
  },
  lineAsVector: {
    start: { q: 0, r: 0 },
    direction: 'E',
    length: 4,
  },
  rectangle: {
    start: { q: 0, r: 0 },
    width: 3,
    height: 3,
    direction: 'E',
  },
  opposingCorners: {
    cornerA: { q: 0, r: 0 },
    cornerB: { q: 1, r: 2 },
  },
  ring: {
    start: { q: 3, r: 2 },
    center: { q: 1, r: 2 },
    rotation: 'cw',
  },
  ringFromRadius: {
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
  lineBetween?: LineBetweenProps
  lineAsVector?: LineAsVectorProps
  rectangle?: RectangleControlProps
  opposingCorners?: OpposingCornersControlProps
  ring?: RingControlProps
  ringFromRadius?: RingFromRadiusControlProps
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
