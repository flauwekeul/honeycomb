import { G } from '@svgdotjs/svg.js'
import { defineHex } from '../../src'
import { IMPASSABLE_COST } from './settings'

export class Tile extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  cost!: number // when it has a value of Infinity, the tile is impassable
  svg!: G

  get isPassable() {
    return this.cost < IMPASSABLE_COST
  }
}
