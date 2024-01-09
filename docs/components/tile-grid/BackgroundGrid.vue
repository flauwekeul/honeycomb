<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Grid, Hex } from '../../../src'
import { CoordinatesType } from '../../types'
import Tile from './Tile.vue'

interface BackgroundGridProps {
  grid: Grid<Hex>
  coordinatesType: CoordinatesType
}

const props = defineProps<BackgroundGridProps>()

const containerEl = ref<SVGElement | null>(null)

const { elementX, elementY, isOutside } = useMouseInElement(containerEl)

const tile = computed(() => {
  if (!isOutside.value) {
    return props.grid.pointToHex({ x: elementX.value, y: elementY.value })
  }
})
</script>

<template>
  <svg
    ref="containerEl"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    :width="grid.pixelWidth"
    :height="grid.pixelHeight"
    class="background-grid"
  >
    <Tile v-if="tile" :key="tile.toString()" :tile="tile" :coordinates-type="coordinatesType" is-diminished />
  </svg>
</template>

<style scoped>
.background-grid {
  display: block;
  overflow: visible;
}
</style>
