import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HexOffset, HexOptionsDimensions, HexOptionsOrigin, Orientation } from '../../../src'

export const useHexSettingsStore = defineStore('hexSettings', () => {
  const orientation = ref<Orientation>('pointy')
  const dimensions = ref<HexOptionsDimensions>(30)
  const origin = ref<HexOptionsOrigin>('topLeft')
  const offset = ref<HexOffset>(-1)

  return { orientation, dimensions, origin, offset }
})
