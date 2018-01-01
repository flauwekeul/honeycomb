import { isArray } from 'axis.js'

import Point from '../point'
import Grid from './class'
import * as statics from './statics'
// import * as methods from './prototype'

export default function createGridFactoryFactory({ createHexFactory }) {
    return function createFactory(Hex = createHexFactory()) {
        // static methods
        Object.assign(GridFactory, {
            // properties:
            // if Hex isn't unbound, it's `this` will reference Gridfactory, code smell?
            Hex: Hex.bind(),

            // methods
            pointToHex: statics.pointToHexFactory({ Point, Hex }),
            hexToPoint: statics.hexToPoint,
            colSize: statics.colSizeFactory({ Hex }),
            rowSize: statics.rowSizeFactory({ Hex }),
            parallelogram: statics.parallelogramFactory({ Grid, Hex }),
            triangle: statics.triangleFactory({ Grid, Hex }),
            hexagon: statics.hexagonFactory({ Grid, Hex }),
            rectangle: statics.rectangleFactory({ Grid, Hex })
        })

        // instance methods
        Object.assign(
            Grid.prototype,
            {
                // properties:
                // used internally for type checking
                __isHoneycombGrid: true
            }
        )

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
        function GridFactory(gridLikeOrHex, ...hexes) {
            if (isArray(gridLikeOrHex)) {
                hexes = gridLikeOrHex
            } else {
                hexes.unshift(gridLikeOrHex)
            }

            if (hexes.__isHoneycombGrid) {
                return hexes.slice(0)
            }

            return new Grid(...hexes.filter(Grid.isValidHex))
        }

        return GridFactory
    }
}
