import { isFunction } from 'axis.js'

import Point from '../point'
import * as methods from './methods'

/**
 * @module src/grid
 * @function Grid
 *
 * @description
 * Factory function for creating grids. It requires a Hex factory function.
 * Calling Honeycomb.Grid() returns a grid instance with several "shape" methods that return an array of hexes in a certain shape.
 * The grid instance also has methods for translating points (e.g. pixels) to hexes and vice versa.
 *
 * @param {Function} [Hex]  Hex factory function. Use {@link extendHex} to create one.
 *
 * @returns {Grid}          A grid instance containing the passed {@link Hex} factory among other methods.
 *                          Use the {@link Hex} factory for creating individual hexes.
 *
 * @example
 * import { Grid, extendHex } from 'Honeycomb'
 *
 * const Hex = extendHex()
 * const grid = Grid(Hex)
 *
 * grid.triangle(3) // [ { x: 0, y: 0, z: 0 },
 *                  //   { x: 0, y: 1, z: -1 },
 *                  //   { x: 0, y: 2, z: -2 },
 *                  //   { x: 1, y: 0, z: -1 },
 *                  //   { x: 1, y: 1, z: -2 },
 *                  //   { x: 2, y: 0, z: -2 } ]
 */
export default function Grid(Hex) {
    if (!isFunction(Hex)) {
        throw new Error(`Hex is not a function: ${Hex}.`)
    }

    return {
        Hex,
        pointToHex:     methods.pointToHexFactory({ Point, Hex }),
        hexToPoint:     methods.hexToPoint,
        colSize:        methods.colSizeFactory({ Hex }),
        rowSize:        methods.rowSizeFactory({ Hex }),
        parallelogram:  methods.parallelogramFactory({ Hex }),
        triangle:       methods.triangleFactory({ Hex }),
        hexagon:        methods.hexagonFactory({ Hex }),
        rectangle:      methods.rectangleFactory({ Hex })
    }
}
