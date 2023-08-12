import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CoordinatesType } from '../types'

export const useSettingsStore = defineStore('settings', () => {
  const coordinates = ref<CoordinatesType>('axial')

  return { coordinates }
})
