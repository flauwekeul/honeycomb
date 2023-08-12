<script setup lang="ts">
import { Point } from '../../../src'

interface LineProps {
  from: Point
  to: Point
}

defineProps<LineProps>()
</script>

<template>
  <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" class="line" />
</template>

<style scoped>
.line {
  stroke: var(--vp-c-red-dark);
  stroke-width: 3;
  stroke-dasharray: 12 8;
  stroke-linecap: round;
}
</style>
