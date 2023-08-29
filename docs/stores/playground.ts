import { defineStore } from 'pinia'
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import { ref } from 'vue'
import { tabName } from '../types'
import { useHexSettingsStore } from './hexSettings'
import { useInitialHexesStore } from './initialHexes'
import { useSettingsStore } from './settings'
import { useTraversalsStore } from './traversals'

export const usePlaygroundStore = defineStore(
  'playground',
  () => {
    const hexSettings = useHexSettingsStore()
    const initialHexes = useInitialHexesStore()
    const traversals = useTraversalsStore()
    const settings = useSettingsStore()

    const activeTab = ref<tabName>('hex')

    const resetAll = () => {
      hexSettings.reset()
      initialHexes.reset()
      traversals.reset()
      settings.reset()
    }

    return {
      hexSettings,
      initialHexes,
      traversals,
      settings,
      activeTab,
      resetAll,
    }
  },
  {
    persist: {
      paths: ['activeTab'],
    },
  },
)

// copied from node_modules/pinia-plugin-persistedstate/dist/index.d.ts
// should not be needed though...
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: boolean | PersistedStateOptions | PersistedStateOptions[]
  }
  interface PiniaCustomProperties {
    $hydrate: (opts?: { runHooks?: boolean }) => void
    $persist: () => void
  }
}
