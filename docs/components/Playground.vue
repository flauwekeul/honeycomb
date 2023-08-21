<script setup lang="ts">
import { ref } from 'vue'
import { Grid, Hex, Traverser, defineHex, line, rectangle, ring, spiral } from '../../src'
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
  spiral,
} as const

const store = usePlaygroundStore()
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(defineHex(store.hexSettings), createTraverser(store.initialHexes.traversers))
let traversal: Grid<Hex> | undefined

const gridKey = ref(0)

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
    <TileGrid :grid="grid" :key="gridKey" :traversal="traversal" class="tile-grid" />
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

.tile-grid {
  margin: 2rem;
  width: 80vw;
}
</style>
