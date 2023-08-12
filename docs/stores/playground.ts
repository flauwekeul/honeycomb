import { defineStore } from 'pinia'
import { useHexSettingsStore } from './hexSettings'
import { useInitialHexesStore } from './initialHexes'
import { useSettingsStore } from './settings'
import { useTraversalsStore } from './traversals'

export const usePlaygroundStore = defineStore('playground', () => {
  const hexSettings = useHexSettingsStore()
  const initialHexes = useInitialHexesStore()
  const traversals = useTraversalsStore()
  const settings = useSettingsStore()

  return { hexSettings, initialHexes, traversals, settings }
})
