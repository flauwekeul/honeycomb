<script setup lang="ts">
import { computed } from 'vue'
import { Hex } from '../../src'

export interface HexProps {
  tile: Hex
  isTraversed?: boolean
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
    <text :x="tile.x" :y="tile.y" :font-size="fontSize" class="coordinates">
      <tspan>{{ tile.q }},{{ tile.r }}</tspan>
    </text>
  </g>
</template>

<style scoped>
.polygon {
  fill: var(--vp-c-brand-lighter);
  stroke: var(--vp-c-brand);
  stroke-width: 2;
}

.dark .polygon {
  fill: var(--vp-c-brand);
  stroke: var(--vp-c-brand-darker);
}

.is-traversed .polygon {
  fill: var(--vp-c-brand);
  stroke: var(--vp-c-brand-light);
}

.dark .is-traversed .polygon {
  fill: var(--vp-c-brand-darker);
  stroke: var(--vp-c-brand-dark);
}

.coordinates {
  text-anchor: middle;
  dominant-baseline: central;
  fill: var(--vp-c-text-light-1);
}
</style>
