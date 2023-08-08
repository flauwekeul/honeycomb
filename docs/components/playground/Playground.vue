<script setup lang="ts">
import { ref } from 'vue'
import { defineHex, Grid, HexOptions, line, rectangle, RectangleOptions, ring, spiral } from '../../../src'
import TileGrid from '../tile-grid/TileGrid.vue'
import Controls, { ControlsProps } from './Controls.vue'
import { defaultRectangleOptions, traverserName } from './shared'
import { TraverserControlProps } from './TraverserControl.vue'

const hexSettings = ref<HexOptions>({ orientation: 'pointy', dimensions: 30, origin: 'topLeft', offset: -1 })
const initialHexes = ref<TraverserControlProps>({ name: 'rectangle', ...defaultRectangleOptions })
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(defineHex(hexSettings.value), rectangle(initialHexes.value as RectangleOptions))
const gridKey = ref(0)

// todo: debounce with requestAnimationFrame?
const update = (controls: ControlsProps) => {
  try {
    hexSettings.value = controls.hexSettings
    initialHexes.value = controls.initialHexes

    // todo: improve type
    const traverser = getTraverser(controls.initialHexes.name) as Function
    grid = new Grid(defineHex(controls.hexSettings), traverser(controls.initialHexes))
    gridKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
}

const getTraverser = (name: traverserName) => ({ line, rectangle, ring, spiral })[name]
</script>

<template>
  <div class="playground">
    <Controls :hex-settings="hexSettings" :initial-hexes="initialHexes" @change="update" class="controls" />
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
