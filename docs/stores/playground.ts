import { defineStore } from 'pinia'
import { useHexSettingsStore } from './hexSettings'
import { useInitialHexesStore } from './initialHexes'
import { useSettingsStore } from './settings'

export const usePlaygroundStore = defineStore('playground', () => {
  const hexSettings = useHexSettingsStore()
  const initialHexes = useInitialHexesStore()
  const settings = useSettingsStore()

  return { hexSettings, initialHexes, settings }
})
