<script setup lang="ts">
import { ref } from 'vue'
import { Grid, Hex, Traverser, defineHex, line, rectangle, ring, spiral } from '../../src'
import { usePlaygroundStore } from '../stores'
import { TraverserControlProps } from '../types'
import Controls from './controls/Controls.vue'
import TileGrid from './tile-grid/TileGrid.vue'

const TRAVERSERS = { line, rectangle, ring, spiral } as const

const store = usePlaygroundStore()
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(defineHex(store.hexSettings), createTraverser(store.initialHexes))
let traversal = grid.traverse(createTraverser(store.traversals))

const gridKey = ref(0)

store.$subscribe((_, { hexSettings, initialHexes, traversals }) => {
  try {
    grid = new Grid(defineHex(hexSettings), createTraverser(initialHexes))
    traversal = grid.traverse(createTraverser(traversals))

    gridKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
})

function createTraverser({ name, ...traversers }: TraverserControlProps): Traverser<Hex> {
  const traverser = TRAVERSERS[name] as Function
  const options = traversers[name]
  return traverser(options)
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
  display: flex;
  min-height: 100vh;
}

.controls {
  width: 20vw;
  opacity: 0.9;
  z-index: 1;
}

.tile-grid {
  margin: 2rem;
  width: 80vw;
}
</style>
