import { Ref, ref } from 'vue'
import { Hex } from '../../src'

// use "global" vars so each consumer of useTilePicker() uses the same values

const isPickingGlobal = ref(false)
let refs = new Set<Ref<boolean>>()
let resolve: (tile: Hex | null | PromiseLike<Hex | null>) => void

// todo: this seems it can be refactored, but several attempts have failed so far
export const useTilePicker = () => {
  const togglePicking = (isPickingLocal: Ref<boolean>) => {
    return new Promise<Hex | null>((_resolve) => {
      resolve = _resolve

      refs.add(isPickingLocal)

      if (isPickingGlobal.value && isPickingLocal.value) {
        disableAll()
        resolve(null)
      } else if (!isPickingLocal.value) {
        disableAll()
        isPickingGlobal.value = true
        isPickingLocal.value = true
      }
    })
  }

  const pick = (tile: Hex) => {
    if (!isPickingGlobal.value) {
      return
    }

    disableAll()
    refs = new Set()
    resolve(tile)
  }

  const disableAll = () => {
    isPickingGlobal.value = false
    refs.forEach((_ref) => {
      _ref.value = false
    })
  }

  return {
    isPicking: isPickingGlobal,
    togglePicking,
    pick,
  }
}
