import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HexOffset, HexOptions, HexOptionsDimensions, HexOptionsOrigin, Orientation } from '../../src'

const defaults: HexOptions = {
  orientation: 'pointy',
  dimensions: 30,
  origin: 'topLeft',
  offset: -1,
} as const

export const useHexSettingsStore = defineStore('hexSettings', () => {
  const orientation = ref<Orientation>(defaults.orientation)
  const dimensions = ref<HexOptionsDimensions>(defaults.dimensions)
  const origin = ref<HexOptionsOrigin>(defaults.origin)
  const offset = ref<HexOffset>(defaults.offset)

  const reset = () => {
    orientation.value = defaults.orientation
    dimensions.value = defaults.dimensions
    origin.value = defaults.origin
    offset.value = defaults.offset
  }

  return {
    orientation,
    dimensions,
    origin,
    offset,
    reset,
  }
})
