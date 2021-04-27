import { createHex, createHexPrototype, Grid, toString } from 'honeycomb-grid'
import { render } from './render'
import { TILES } from './tiles'
import { Tile } from './types'

const hexPrototype = createHexPrototype<Tile>({ dimensions: 50, origin: 'topLeft' })
const store = new Map(TILES.map((tile) => [toString(tile), createHex(hexPrototype, tile)]))
const baseGrid = new Grid(hexPrototype, store)

baseGrid.each(render).run()
