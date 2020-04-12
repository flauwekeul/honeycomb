import { isArray, isNumber } from 'axis.js'
import { compassToNumberDirection, signedModulo } from '../utils'
import * as methods from './prototype'
import * as statics from './statics'

export default function defineGridFactory({ extendHex, Grid, Point }) {
  const { isValidHex } = Grid

  /**
   * @function defineGrid
   *
   * @memberof Honeycomb
   * @static
   *
   * @description
   * This function can be used to create {@link Grid} factories by passing it a {@link Hex} factory.
   *
   * @param {Hex} [Hex=Honeycomb.extendHex()] A {@link Hex} factory.
   *                                          If nothing is passed, the default Hex factory is used by calling `Honeycomb.extendHex()` internally.
   *
   * @returns {Grid}                          A Grid factory.
   *
   * @example
   * // create a Grid factory that uses the default Hex Factory:
   * const Grid = Honeycomb.defineGrid()
   * const hex = Grid.Hex()
   * hex.size         // { xRadius: 1, yRadius: 1 }
   *
   * // create your own Hex factory
   * const CustomHex = Honeycomb.extendHex({ size: 10, custom: '🤓' })
   * // …and pass it to defineGrid() to create a Grid factory that produces your custom hexes
   * const CustomGrid = Honeycomb.defineGrid(CustomHex)
   * const customHex = CustomGrid.Hex()
   * customHex.size   // { xRadius: 10, yRadius: 10 }
   * customHex.custom // 🤓
   */
  return function defineGrid(Hex = extendHex()) {
    // static properties
    Object.assign(GridFactory, {
      /**
       * The {@link Hex} factory the Grid factory was created with.
       * @memberof Grid
       * @static
       * @function
       */
      // don't manually bind `this` to Hex (i.e. `Hex.call`/`Hex.apply`) anywhere in the source
      // it could cause this:
      // function methodThatBindsThis() {
      //     return Hex.call(this, ...) <- `this` refers to `GridFactory`
      // }
      // which is caused by the following line:
      Hex,

      // methods
      /**
       * @memberof Grid
       * @static
       * @method
       *
       * @param {*} value     Any value.
       * @returns {boolean}   Whether the passed value is a valid hex.
       */
      isValidHex,
      pointToHex: statics.pointToHexFactory({ Point, Hex }),
      parallelogram: statics.parallelogramFactory({ Grid, Hex }),
      triangle: statics.triangleFactory({ Grid, Hex }),
      hexagon: statics.hexagonFactory({ Grid, Hex }),
      rectangle: statics.rectangleFactory({ Grid, Hex, compassToNumberDirection, signedModulo }),
      ring: statics.ringFactory({ Grid, Hex }),
      spiral: statics.spiralFactory({ Grid, Hex }),
    })

    // prototype properties
    Object.assign(Grid.prototype, {
      // methods
      get: methods.get,
      hexesBetween: methods.hexesBetween,
      hexesInRange: methods.hexesInRangeFactory({ isValidHex }),
      neighborsOf: methods.neighborsOfFactory({
        isValidHex,
        signedModulo,
        compassToNumberDirection,
      }),
      pointHeight: methods.pointHeight,
      pointWidth: methods.pointWidth,
      set: methods.setFactory({ isValidHex }),
    })

    /**
     * @function Grid
     *
     * @description
     * A function to create hex {@link grid}s and perform various operations on them.
     *
     * A Grid factory has several static methods that return {@link grid}s of hexes in a certain shape.
     * It can also be called with 1 or more points/hexes or an array of points/hexes to create a {@link grid} instance.
     *
     * A {@link grid} extends `Array.prototype`, with some methods overwritten and some new methods added.
     *
     * @param {...point} [points] An array of points/hexes or separate arguments that are points/hexes.
     * @returns {grid}            A grid instance containing only valid hexes.
     *
     * @example
     * const Grid = Honeycomb.defineGrid()
     * // the Hex factory used by the Grid to produce hexes is available as a property
     * const Hex = Grid.Hex
     *
     * Grid(Hex(3, -1), Hex(2, 0))      // [{ x: 3, y: -1 }, { x: 2, y: 0 }]
     * Grid([Hex(3, -1), Hex(2, 0)])    // [{ x: 3, y: -1 }, { x: 2, y: 0 }]
     *
     * // it also accepts points
     * Grid({ x: 3, y: -1 }, [2, 0])    // [{ x: 3, y: -1 }, { x: 2, y: 0 }]
     * Grid([{ x: 3, y: -1 }, [2, 0]])  // [{ x: 3, y: -1 }, { x: 2, y: 0 }]
     *
     * // clone a grid:
     * const grid = Grid(Hex(), Hex(1), Hex(2))
     * const clonedGrid = Grid(grid)      // [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]
     * grid === clonedGrid                // false
     */
    function GridFactory(...points) {
      points = points.filter(Boolean)

      if (isArray(points[0]) && (points[0].length === 0 || points[0].some((point) => !isNumber(point)))) {
        points = points[0]
      }

      /**
       * @typedef {Object} grid
       * @extends Array
       *
       * @property {number} length    Amount of hexes in the grid.
       */
      return new Grid(...points.map((point) => Hex(point)))
    }

    return GridFactory
  }
}
