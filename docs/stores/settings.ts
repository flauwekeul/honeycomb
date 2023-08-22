import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CoordinatesType } from '../types'

export const useSettingsStore = defineStore('settings', () => {
  const coordinatesType = ref<CoordinatesType>('axial')

  return { coordinatesType }
})
