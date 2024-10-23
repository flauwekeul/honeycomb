import { G } from '@svgdotjs/svg.js'
import { defineHex } from '../../src'

export class Tile extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  obstacle!: boolean
  reachable!: boolean
  distance!: number
  activePath!: boolean
  svg!: G
}
