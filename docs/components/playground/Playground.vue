<script setup lang="ts">
import { ref } from 'vue'
import { Grid, RectangleOptions, defineHex, line, rectangle, ring, spiral } from '../../../src'
import { usePlaygroundStore } from '../stores'
import TileGrid from '../tile-grid/TileGrid.vue'
import { TraverserName } from '../types'
import Controls from './Controls.vue'

const store = usePlaygroundStore()
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(defineHex(store.hexSettings), rectangle(store.initialHexes.rectangle as RectangleOptions))
const gridKey = ref(0)

store.$subscribe((_, { hexSettings, initialHexes }) => {
  try {
    const traverserName = initialHexes.name
    const traverser = getTraverser(traverserName)
    grid = new Grid(defineHex(hexSettings), traverser(initialHexes[traverserName]))
    gridKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
})

const getTraverser = (name: TraverserName): Function => ({ line, rectangle, ring, spiral })[name]
</script>

<template>
  <div class="playground">
    <Controls class="controls" />
    <TileGrid :grid="grid" :key="gridKey" class="tile-grid" />
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
