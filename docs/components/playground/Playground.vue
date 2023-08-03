<script setup lang="ts">
import { ref } from 'vue'
import { defaultHexSettings, defineHex, Grid, HexOptions, rectangle } from '../../../src'
import TileGrid from '../TileGrid.vue'
import Controls, { ControlsProps, RectangleTraverserOptions } from './Controls.vue'

const hexSettings: HexOptions = { ...defaultHexSettings, dimensions: 30 }
const initialHexes: RectangleTraverserOptions = {
  name: 'rectangle',
  width: 10,
  height: 10,
  start: { q: 0, r: 0 },
  direction: 'E',
}
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(defineHex(hexSettings), rectangle(initialHexes))
const gridKey = ref(0)

// todo: debounce with requestAnimationFrame?
const update = ({ hexSettings, initialHexes }: ControlsProps) => {
  try {
    grid = new Grid(defineHex(hexSettings), rectangle(initialHexes))
    gridKey.value = Math.random()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="playground">
    <TileGrid :grid="grid" :key="gridKey" />
    <Controls :hex-settings="hexSettings" :initial-hexes="initialHexes" @update="update" class="controls" />
  </div>
</template>

<style scoped>
.playground {
  position: relative;
  margin: 32px;
}

.controls {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
