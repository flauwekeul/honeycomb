<script setup lang="ts">
import { computed } from 'vue'
import { Hex } from '../../../src'
import { useTilePicker } from '../../composables'
import { CoordinatesType } from '../../types'

interface HexProps {
  tile: Hex
  isTraversed?: boolean
  coordinatesType: CoordinatesType
}

const { tile, isTraversed } = withDefaults(defineProps<HexProps>(), {
  isTraversed: false,
})
const { isPicking, pick } = useTilePicker()

const points = tile.corners.map(({ x, y }) => `${x},${y}`).join(' ')
const fontSize = computed(() => tile.height / 4)
</script>

<template>
  <g :class="{ 'is-traversed': isTraversed, 'is-selectable': isPicking }" @click="pick(tile)">
    <polygon :points="points" class="polygon"></polygon>
    <text v-if="coordinatesType !== 'hide'" :x="tile.x" :y="tile.y" :font-size="fontSize" class="coordinates-type">
      <tspan v-if="coordinatesType === 'axial'">{{ tile.q }},{{ tile.r }}</tspan>
      <tspan v-if="coordinatesType === 'offset'">{{ tile.col }},{{ tile.row }}</tspan>
    </text>
  </g>
</template>

<style scoped>
.polygon {
  fill: var(--slate-300);
  stroke: var(--slate-400);
  stroke-width: 2;
  transition:
    fill 0.25s,
    stroke 0.25s;
}

.is-traversed .polygon {
  fill: var(--slate-500);
  stroke: var(--slate-500);
  fill-opacity: 0.4;
}

.is-selectable:hover {
  cursor: pointer;
}

.is-selectable:hover .polygon {
  fill: var(--yellow-400);
  stroke: var(--yellow-500);
}

.coordinates-type {
  text-anchor: middle;
  dominant-baseline: central;
  fill: currentColor;
}

.dark .polygon {
  fill: var(--slate-600);
  stroke: var(--slate-800);
}

.dark .is-traversed .polygon {
  fill: var(--slate-400);
  stroke: var(--slate-700);
}

.dark .is-selectable:hover .polygon {
  fill: var(--yellow-500);
  stroke: var(--yellow-700);
}

.dark .is-selectable:hover {
  color: var(--vp-c-black);
}
</style>
