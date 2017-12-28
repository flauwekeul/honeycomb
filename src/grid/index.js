import Point from '../point'
import * as methods from './methods'

export default function GridFactory({ extendHex }) {
    /**
     * @module src/grid
     * @function Grid
     *
     * @description
     * A function to create hex grids.
     *
     * Calling Grid() returns an object that includes several "shape" methods that create arrays of hexes in different configuration.
     *
     * Grid accepts an optional Hex factory, which can be created with {@link extendHex|Honeycomb.extendHex}.
     * When Grid() is called without passing a Hex factory, the default Hex factory is used.
     * This Hex factory produces hexes with a size of 1. When creating hexes in the browser, you probably want to set a different size.
     *
     * @param {Function} [Hex=] Hex factory function. {@link extendHex} can be used to create your own.
     *
     * @returns {Grid}          A grid instance containing several methods for creating hex grids.
     *
     * @example
     * import { Grid, extendHex } from 'Honeycomb'
     *
     * const grid = Grid()
     *
     * grid.triangle(3)             // [ { x: 0, y: 0, z: 0 },
     *                              //   { x: 0, y: 1, z: -1 },
     *                              //   { x: 0, y: 2, z: -2 },
     *                              //   { x: 1, y: 0, z: -1 },
     *                              //   { x: 1, y: 1, z: -2 },
     *                              //   { x: 2, y: 0, z: -2 } ]
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
