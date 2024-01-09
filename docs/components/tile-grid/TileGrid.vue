<script setup lang="ts">
import { computed } from 'vue'
import { Grid, Hex } from '../../../src'
import { CoordinatesType } from '../../types'
import Arrow, { ArrowProps } from './Arrow.vue'
import Tile from './Tile.vue'

interface TileGridProps {
  grid: Grid<Hex>
  traversal?: Grid<Hex>
  coordinatesType?: CoordinatesType
}

const { grid, traversal } = withDefaults(defineProps<TileGridProps>(), {
  traversal: () => new Grid(Hex), // empty grid
  coordinatesType: 'axial',
})

const arrowData = computed(() =>
  traversal.toArray().reduce((acc, currentTile, index, tiles) => {
    const nextTile = tiles[index + 1]

    if (!nextTile) return acc

    const { x: fromX, y: fromY } = currentTile
    const { x: toX, y: toY } = nextTile
    const rotation = Math.atan2(toY - fromY, toX - fromX)
    // the mathy stuff is to reduce the length of the arrow (else it would go from a hex's center to a hex's center)
    const from = { x: fromX + Math.cos(rotation) * 12, y: fromY + Math.sin(rotation) * 12 }
    const to = { x: toX - Math.cos(rotation) * 26, y: toY - Math.sin(rotation) * 26 }

    return acc.concat({ from, to })
  }, [] as ArrowProps[]),
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    :width="grid.pixelWidth"
    :height="grid.pixelHeight"
    class="tile-grid"
  >
    <defs>
      <marker id="arrow-head" markerWidth="10" markerHeight="10" refX="0" refY="1.5" orient="auto">
        <path d="M0,0 L0,3 L2.5,1.5 z" class="arrow-head" />
      </marker>
    </defs>

    <Tile
      v-for="tile of grid"
      :key="tile.toString()"
      :tile="tile"
      :coordinates-type="traversal.hasHex(tile) ? 'hide' : coordinatesType"
    />
    <Tile
      v-for="tile of traversal"
      :key="tile.toString()"
      :tile="tile"
      is-traversed
      :coordinates-type="coordinatesType"
    />
    <Arrow v-for="{ from, to } of arrowData" :from="from" :to="to" />

    <slot></slot>
  </svg>
</template>

<style scoped>
.tile-grid {
  display: block;
  overflow: visible;
}

.arrow-head {
  fill: var(--vp-c-text-light-2);
}

.dark .arrow-head {
  fill: var(--vp-c-text-dark-2);
}
</style>
