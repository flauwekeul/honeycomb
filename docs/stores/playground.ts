import { Position, noop } from '@vueuse/core'
import { defineStore } from 'pinia'
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import { ref } from 'vue'
import { tabName } from '../types'
import { useHexSettingsStore } from './hexSettings'
import { useInitialHexesStore } from './initialHexes'
import { useSettingsStore } from './settings'
import { useTraversalsStore } from './traversals'

const defaults = {
  dragPosition: {
    // 20vw (0.2) is the width of the controls
    x: window.innerWidth * 0.2 + 24,
    // 64px is the height of the navbar (--vp-nav-height)
    y: 64 + 24,
  },
} as const

let resetGridPositionCallback = noop

export const usePlaygroundStore = defineStore(
  'playground',
  () => {
    const hexSettings = useHexSettingsStore()
    const initialHexes = useInitialHexesStore()
    const traversals = useTraversalsStore()
    const settings = useSettingsStore()

    const activeTab = ref<tabName>('hex')
    const dragPosition = ref<Position>({ ...defaults.dragPosition })

    const resetAll = () => {
      hexSettings.reset()
      initialHexes.reset()
      traversals.reset()
      settings.reset()
      resetGridPosition()
    }

    const resetGridPosition = () => {
      dragPosition.value = { ...defaults.dragPosition }
      resetGridPositionCallback()
    }

    const onResetGridPosition = (fn: () => void) => {
      resetGridPositionCallback = fn
    }

    return {
      hexSettings,
      initialHexes,
      traversals,
      settings,
      activeTab,
      dragPosition,
      resetAll,
      resetGridPosition,
      onResetGridPosition,
    }
  },
  {
    persist: {
      paths: ['activeTab', 'dragPosition'],
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
