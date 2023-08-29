import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CoordinatesType } from '../types'

interface SettingsStore {
  coordinatesType: CoordinatesType
}

const defaults: SettingsStore = {
  coordinatesType: 'axial',
} as const

export const useSettingsStore = defineStore('settings', () => {
  const coordinatesType = ref<CoordinatesType>(defaults.coordinatesType)

  const reset = () => {
    coordinatesType.value = defaults.coordinatesType
  }

  return {
    coordinatesType,
    reset,
  }
})
