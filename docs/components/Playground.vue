<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Grid, Hex, HexOptions, Traverser, defineHex, line, rectangle, ring, spiral } from '../../src'
import { useTilePicker } from '../composables'
import { usePlaygroundStore } from '../stores'
import { TraverserControlProps } from '../types'
import Controls from './controls/Controls.vue'
import BackgroundGrid from './tile-grid/BackgroundGrid.vue'
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
let backgroundGrid = createBackgroundGrid(store.hexSettings)
let grid = new Grid(defineHex(store.hexSettings), createTraverser(store.initialHexes.traversers))
let traversal: Grid<Hex> | undefined

const randomKey = ref(0)
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
    backgroundGrid = createBackgroundGrid(hexSettings)
    grid = new Grid(defineHex(hexSettings), createTraverser(initialHexes.traversers))
    traversal = grid.traverse(createTraverser(traversals.traversers), { bail: traversals.bail })

    randomKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
})

function createBackgroundGrid(hexOptions: HexOptions) {
  const Tile = defineHex(hexOptions)
  // todo: it's shitty to have to create a hex:
  const tile = new Tile()
  // todo: create util in Honeycomb for this
  const tileWidth = tile.width * (tile.isPointy ? 1 : 0.75)
  const tileHeight = tile.height * (tile.isPointy ? 0.75 : 1)
  const width = Math.floor(window.innerWidth / tileWidth)
  const height = Math.floor(window.innerHeight / tileHeight)

  return new Grid(Tile, rectangle({ width, height, start: [-7, -2] }))
}

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
      <BackgroundGrid
        :grid="backgroundGrid"
        :key="randomKey"
        :coordinates-type="store.settings.coordinatesType"
        class="grid"
      />
      <TileGrid
        :grid="grid"
        :key="randomKey"
        :traversal="traversal"
        :coordinates-type="store.settings.coordinatesType"
        class="grid"
      />
    </div>
  </div>
</template>

<style scoped>
.playground {
  height: calc(100vh - var(--vp-nav-height));
  position: fixed;
}

.controls {
  background-color: color-mix(in srgb, var(--el-card-bg-color) 90%, transparent);
  height: 100%;
  min-width: 360px;
  overflow-y: auto;
  position: absolute;
  z-index: 1;
}

.draggable {
  position: fixed;
}
.draggable.can-drag:hover {
  cursor: grab;
}
.draggable.is-dragging {
  cursor: grabbing;
  opacity: 0.7;
  user-select: none;
}

.grid {
  position: absolute;
}
</style>
