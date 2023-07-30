<script setup lang="ts">
import { Point } from '../../src'

// export interface ArrowProps {
//   center: Point
//   length: number
//   rotation: number
// }
export interface ArrowProps {
  from: Point
  to: Point
}

defineProps<ArrowProps>()
// const { center, length, rotation } = defineProps<ArrowProps>()
// const halfLength = length / 2
// const toRadians = (rotation: number) => (rotation * Math.PI) / 180
// const from = {
//   x: center.x + halfLength * Math.cos(toRadians(rotation - 180)),
//   y: center.y + halfLength * Math.sin(toRadians(rotation - 180)),
// }
// const to = {
//   x: center.x + halfLength * Math.cos(toRadians(rotation)),
//   y: center.y + halfLength * Math.sin(toRadians(rotation)),
// }
</script>

<template>
  <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" marker-end="url(#arrow-head)" class="line" />
</template>

<style scoped>
.line {
  stroke: var(--vp-c-text-light-2);
  stroke-width: 6;
}
</style>
