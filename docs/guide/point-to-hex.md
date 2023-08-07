# Point → hex

<!-- todo: link "irregularly shaped hexes" to page about hex dimensions -->

Translating a point (e.g. screen pixel) to the corresponding hex in a grid is possible with `Grid`'s `pointToHex()` method. It also works with irregularly shaped hexes.

`pointToHex()` accepts a second argument to indicate what to do when a point corresponds to a hex *outside* the grid. By default it creates the hex and returns that.

```typescript{9-12}
import { defineHex, Grid, rectangle } from 'honeycomb-grid'

const WideHex = defineHex({
  dimensions: { xRadius: 50, yRadius: 30 }, // wide hexes
})
const grid = new Grid(WideHex, rectangle({ width: 5, height: 5 }))

document.addEventListener('click', ({ offsetX, offsetY }) => {
  const hex = grid.pointToHex(
    { x: offsetX, y: offsetY },
    { allowOutside: false }
  )
  console.log(hex)
})
```

<p v-if="clickedTile" class="output">Tile clicked: {{ clickedTile }}</p>
<p v-else class="output">Click somewhere below</p>
<TileGrid :grid="grid" @click="updateClickedTile" class="grid" />
<div class="controls">
  <label>
    <input type="checkbox" v-model="allowOutside">
    Allow outside
  </label>
</div>

<script setup lang="ts">
import { defineHex, Grid, rectangle } from '../../src';
import TileGrid from '../components/TileGrid.vue';
import { ref } from 'vue';

const Hex = defineHex({ dimensions: { xRadius: 50, yRadius: 30 } })
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))

const clickedTile = ref()
const allowOutside = ref(false)

const updateClickedTile = ({ offsetX, offsetY }: MouseEvent) => {
  // correct for translation of TileGrid
  const hex = grid.pointToHex(
    {
      x: offsetX - Hex.prototype.width / 2,
      y: offsetY - Hex.prototype.height / 2
    },
    { allowOutside: allowOutside.value }
  )
  clickedTile.value = hex ? hex.toString() : 'outside'
}
</script>

<style scoped>
.grid {
  background-color: var(--vp-c-text-light-3);
  margin: 2rem auto;
}

.controls {
  text-align: center;
}

.output {
  font-size: 1.3em;
  margin: 1em 0;
  text-align: center;
}
</style>
