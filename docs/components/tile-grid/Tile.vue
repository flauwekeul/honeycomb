<script setup lang="ts">
import { computed } from 'vue'
import { Hex } from '../../../src'
import { CoordinatesType } from './TileGrid.vue'

export interface HexProps {
  tile: Hex
  isTraversed?: boolean
  coordinates: CoordinatesType
}

const { tile, isTraversed } = withDefaults(defineProps<HexProps>(), {
  isTraversed: false,
})

// const transform = computed(() => `translate(${tile.width / 2},${tile.height / 2})`)
const points = tile.corners.map(({ x, y }) => `${x},${y}`).join(' ')
const fontSize = computed(() => tile.height / 4)
</script>

<template>
  <g :class="{ 'is-traversed': isTraversed }">
    <!-- <g :transform="transform" :class="{ 'is-traversed': isTraversed }"> -->
    <polygon :points="points" class="polygon"></polygon>
    <text v-if="coordinates !== 'hide'" :x="tile.x" :y="tile.y" :font-size="fontSize" class="coordinates">
      <tspan v-if="coordinates === 'axial'">{{ tile.q }},{{ tile.r }}</tspan>
      <tspan v-if="coordinates === 'offset'">{{ tile.col }},{{ tile.row }}</tspan>
    </text>
  </g>
</template>

<style scoped>
.polygon {
  fill: var(--slate-300);
  stroke: var(--slate-400);
  stroke-width: 2;
}

.is-traversed .polygon {
  fill: var(--slate-400);
  stroke: var(--slate-500);
}

.coordinates {
  text-anchor: middle;
  dominant-baseline: central;
  fill: var(--vp-c-black);
}

.dark .polygon {
  fill: var(--slate-600);
  stroke: var(--slate-800);
}

.dark .is-traversed .polygon {
  fill: var(--slate-700);
  stroke: var(--slate-800);
}

.dark .coordinates {
  fill: var(--vp-c-white);
}
</style>
