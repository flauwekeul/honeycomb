<script setup lang="ts">
import { ref } from 'vue'
import { defaultHexSettings, defineHex, Grid, HexOptions, rectangle } from '../../src'
import TileControls, { TileControlsProps } from '../components/TileControls.vue'
import TileGrid from '../components/TileGrid.vue'

const hexSettings = ref<HexOptions>({ ...defaultHexSettings, dimensions: 30 })
const Hex = defineHex(hexSettings.value)
const initialHexes = rectangle({ width: 10, height: 10 })
// grid can't be a ref because Proxies don't work with private class field
// see: https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
let grid = new Grid(Hex, initialHexes)
const key = ref(Math.random())

const update = (value: TileControlsProps) => {
  hexSettings.value = value.hexSettings
  grid = new Grid(defineHex(value.hexSettings), initialHexes)
  key.value = Math.random()
}
</script>

<template>
  <div class="playground">
    <TileGrid :grid="grid" :key="key" />
    <TileControls :hex-settings="hexSettings" @update="update" class="controls" />
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
