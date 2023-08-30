<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Grid, Hex, Traverser, defineHex, line, rectangle, ring, spiral } from '../../src'
import { useTilePicker } from '../composables'
import { usePlaygroundStore } from '../stores'
import { TraverserControlProps } from '../types'
import Controls from './controls/Controls.vue'
import TileGrid from './tile-grid/TileGrid.vue'

const TRAVERSERS = {
  lineBetween: line,
  lineAsVector: line,
  rectangle,
  opposingCorners: rectangle,
  ring,
  ringFromRadius: ring,
  spiral,
} as const

const store = usePlaygroundStore()
const { isPicking } = useTilePicker()
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(defineHex(store.hexSettings), createTraverser(store.initialHexes.traversers))
let traversal: Grid<Hex> | undefined

const gridKey = ref(0)
const dragEl = ref<HTMLElement | null>(null)
const canDrag = computed(() => !isPicking.value)

const { style, position, isDragging } = useDraggable(dragEl, {
  initialValue: store.dragPosition,
  onStart() {
    if (!canDrag.value) return false
  },
  onEnd(position) {
    store.dragPosition = position
  },
})

store.onResetGridPosition(() => {
  position.value = store.dragPosition
})

store.$subscribe((_, { hexSettings, initialHexes, traversals }) => {
  try {
    grid = new Grid(defineHex(hexSettings), createTraverser(initialHexes.traversers))
    traversal = grid.traverse(createTraverser(traversals.traversers), { bail: traversals.bail })

    gridKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
})

function createTraverser(traverserConfigs: TraverserControlProps[]): Traverser<Hex>[] {
  return traverserConfigs.map(({ name, ...traversers }) => {
    if (name === 'opposingCorners') {
      return rectangle(traversers.opposingCorners.cornerA, traversers.opposingCorners.cornerB)
    }

    const traverser = TRAVERSERS[name] as Function
    const options = traversers[name]
    return traverser(options)
  })
}
</script>

<template>
  <div class="playground">
    <Controls class="controls" />
    <div ref="dragEl" :style="style" class="draggable" :class="{ 'can-drag': canDrag, 'is-dragging': isDragging }">
      <TileGrid :grid="grid" :key="gridKey" :traversal="traversal" />
    </div>
  </div>
</template>

<style scoped>
.playground {
  position: fixed;
  display: flex;
  height: calc(100vh - var(--vp-nav-height));
}

.controls {
  background-color: color-mix(in srgb, var(--el-card-bg-color) 90%, transparent);
  width: 20vw;
  max-height: 100%;
  overflow-y: auto;
  z-index: 1;
}

.draggable {
  position: fixed;
  outline: 1px dashed var(--vp-c-text-light-3);
  transition:
    outline-color 0.25s,
    opacity 0.25s;
}
.draggable.can-drag:hover {
  outline-color: var(--vp-c-brand);
  cursor: grab;
}
.draggable.is-dragging {
  cursor: grabbing;
  user-select: none;
  opacity: 0.7;
}

.dark .draggable {
  outline-color: var(--vp-c-text-dark-3);
}
</style>
