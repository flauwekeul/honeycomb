import Point from '../point'
import * as methods from './methods'

export default function GridFactory({ extendHex }) {
    /**
     * @module src/grid
     * @function Grid
     *
     * @description
     * A function to create and manage hex grids.
     *
     * Grid() returns an object with methods to convert points and hexes and create arrays of hexes with different "shapes".
     *
     * Grid accepts an optional Hex factory, which can be created with {@link extendHex|Honeycomb.extendHex}.
     * When Grid() is called without a Hex factory, the default Hex factory is used.
     * This default Hex factory produces hexes with a size of 1. When creating hexes in the browser, you probably want to set a different size.
     *
     * @param {Function} [Hex=] Hex factory function. {@link extendHex} can be used to create your own.
     *
     * @returns {Object}        An object containing the final Hex factory and several methods for creating arrays of hexes.
     *
     * @example
     * import { Grid, extendHex } from 'Honeycomb'
     *
     * const grid = Grid()
     *
     * grid.triangle(3) // [ { x: 0, y: 0, z: 0 },
     *                  //   { x: 0, y: 1, z: -1 },
     *                  //   { x: 0, y: 2, z: -2 },
     *                  //   { x: 1, y: 0, z: -1 },
     *                  //   { x: 1, y: 1, z: -2 },
     *                  //   { x: 2, y: 0, z: -2 } ]
     *
     * // use extendHex() to create a custom Hex factory
     * const customHex = extendHex({ size: 30 })
     * // create a new grid with this custom Hex factory
     * const grid2 = Grid(customHex)
     *
     * grid.pointToHex([ 20, 40 ])  // { x: -1, y: 27, z: -25 }
     * grid2.pointToHex([ 20, 40 ]) // { x: 0, y: 1, z: -1 }
     */
    return function Grid(Hex = extendHex()) {
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
}
