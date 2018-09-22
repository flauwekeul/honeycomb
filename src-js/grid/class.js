import { ensureXY } from '../utils'
import PointFactory from '../point'

const Point = PointFactory({ ensureXY })

/**
 * @private
 *
 * The only way to prevent setting invalid items in a grid (`grid[0] = 'not a hex'`) is by using proxies.
 * A proxy can have a `set` trap that can prevent the setting of invalid hexes.
 *
 * Some approaches include:
 * 1. Wrapping the grid instance returned from GridFactory in a proxy.
 * 2. Putting a proxy in the prototype chain of Grid (this "shields" the Array prototype methods).
 * 3. Using a proxy to forward certain calls to the Array prototype (and not extending Array at all).
 */

export default class Grid extends Array {
  /**
   * @private
   * @param {*} value     Any value.
   * @returns {boolean}   Whether the passed value is a valid hex.
   */
  static isValidHex(value) {
    return (value || {}).__isHoneycombHex === true
  }

  /**
   * @memberof Grid#
   * @override
   * @throws {TypeError}  It makes no sense for a grid to fill it with arbitrary values, because it should only contain valid hexes.
   *
   * @returns {TypeError} An error.
   */
  fill() {
    throw new TypeError('Grid.prototype.fill is not implemented')
  }

  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes|Array#includes},
   * but searches the passed hex (which can also be a {@link point}.
   *
   * @memberof Grid#
   * @override
   *
   * @param {point} point             The coordinates to search for.
   * @param {number} [fromIndex=0]    Optional index to start searching.
   *
   * @returns {boolean}               Whether the hex is included in the grid.
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   * const grid = Grid(Hex(0))    // [ { x: 0, y: 0 } ]
   *
   * grid.includes(Hex(0))        // true
   * grid.includes([0, 0])        // true
   * grid.includes(Hex(0), 1)     // false
   * grid.includes(Hex(5, 7))     // false
   */
  includes(point, fromIndex = 0) {
    return !!(this.indexOf(point, fromIndex) + 1)
  }

  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array#indexOf},
   * but accepts a {@link point} and internally uses {@link Hex#equals} as a comparator.
   *
   * @memberof Grid#
   * @override
   *
   * @param {point} point             The coordinates to search for.
   * @param {number} [fromIndex=0]    Optional index to start searching.
   *                                  If negative, it is taken as the offset from the end of the grid.
   *
   * @returns {number}                The index of the found hex (first from the left) or -1 if the hex wasn't found.
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   * const grid = Grid(Hex(0), Hex(1), Hex(0))
   * // [
   * //    { x: 0, y: 0 },
   * //    { x: 1, y: 1 },
   * //    { x: 0, y: 0 }
   * // ]
   *
   * grid.indexOf(Hex(0))     // 0
   * grid.indexOf([0, 0])     // 0
   * grid.indexOf(Hex(0), 1)  // 2
   * grid.indexOf(Hex(5, 7))  // -1
   */
  indexOf(point, fromIndex = 0) {
    const { length } = this
    let i = Number(fromIndex)

    point = Point(point)
    i = Math.max(i >= 0 ? i : length + i, 0)

    for (i; i < length; i++) {
      if (this[i].equals(point)) {
        return i
      }
    }

    return -1
  }

  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf|Array#lastIndexOf},
   * but accepts a {@link point} and internally uses {@link Hex#equals} as a comparator.
   *
   * Because all hexes will have different coordinates in most grids, this method behaves the same as {@link Grid#indexOf}.
   * This method might have a slightly better performance if you know the search hex is at the end of the grid.
   *
   * @memberof Grid#
   * @override
   *
   * @param {point} point                 The coordinates to search for.
   * @param {number} [fromIndex=length-1] Optional index to start searching back from.
   *                                      If negative, it is taken as the offset from the end of the grid.
   *
   * @returns {number}                    The last index of the found hex or -1 if the hex wasn't found.
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   * const grid = Grid(Hex(0), Hex(1), Hex(0))
   * // [
   * //    { x: 0, y: 0 },
   * //    { x: 1, y: 1 },
   * //    { x: 0, y: 0 }
   * // ]
   *
   * grid.lastIndexOf(Hex(0))     // 2
   * grid.lastIndexOf([0, 0])     // 2
   * grid.lastIndexOf(Hex(0), 1)  // 0
   * grid.lastIndexOf(Hex(5, 7))  // -1
   */
  lastIndexOf(point, fromIndex = this.length - 1) {
    const { length } = this
    let i = Number(fromIndex)

    point = Point(point)
    i = i >= 0 ? Math.min(i, length - 1) : length + i

    for (i; i >= 0; i--) {
      if (this[i].equals(point)) {
        return i
      }
    }

    return -1
  }

  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push|Array#push},
   * but filters out any passed invalid hexes.
   *
   * @memberof Grid#
   * @override
   *
   * @param {...hex} [hexes]  Hexes to add to the end of the grid. Invalid hexes are ignored.
   *
   * @returns {number}        The new length of the grid.
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   *
   * const grid = Grid(Hex(0))    // [{ x: 0, y: 0 }]
   * grid.push(Hex(1))            // 2
   * grid                         // [{ x: 0, y: 0 }, { x: 1, y: 1 }]
   *
   * grid.push('invalid')         // 2
   * grid                         // [{ x: 0, y: 0 }, { x: 1, y: 1 }]
   */
  push(...hexes) {
    return super.push(...hexes.filter(Grid.isValidHex))
  }

  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice|Array#splice},
   * but filters out any passed invalid hexes.
   *
   * @memberof Grid#
   * @override
   *
   * @param {number} start                        Index at which to start changing the grid.
   * @param {number} [deleteCount=length-start]   Amount of hexes to delete.
   * @param {...hex} [hexes=[]]                   The hexes to add to the grid, beginning at the `start`.
   *
   * @returns {hex[]}                             A grid with the deleted hexes (if any).
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   * const grid = Grid.rectangle({ width: 2, height: 1 })
   * // [
   * //    { x: 0, y: 0 },
   * //    { x: 1, y: 0 },
   * //    { x: 0, y: 1 },
   * //    { x: 1, y: 1 }
   * // ]
   *
   * grid.splice(2)               // [{ x: 0, y: 1 }, { x: 1, y: 1 }] <- deleted hexes
   * grid                         // [{ x: 0, y: 0 }, { x: 1, y: 0 }] <- leftover hexes
   *
   * grid.splice(2, 1)            // [{ x: 0, y: 1 }]
   * grid                         // [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
   *
   * grid.splice(2, 1, Hex(2))    // [{ x: 0, y: 1 }]
   * grid
   * // [
   * //    { x: 0, y: 0 },
   * //    { x: 1, y: 0 },
   * //    { x: 2, y: 2 },
   * //    { x: 1, y: 1 }
   * // ]
   */
  splice(start, deleteCount, ...hexes) {
    // when deleteCount is undefined/null, it's casted to 0, deleting 0 hexes
    // this is not according to spec: it should delete all hexes (starting from `start`)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    if (deleteCount == null) {
      return super.splice(start)
    }

    return super.splice(start, deleteCount, ...hexes.filter(Grid.isValidHex))
  }

  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift|Array#unshift},
   * but filters out any passed invalid hexes.
   *
   * @memberof Grid#
   * @override
   *
   * @param {...hex} [hexes]  Hexes to add to the start of the grid. Invalid hexes are ignored.
   *
   * @returns {number}        The new length of the grid.
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   *
   * const grid = Grid(Hex(0))    // [{ x: 0, y: 0 }]
   * grid.unshift(Hex(1))         // 2
   * grid                         // [{ x: 1, y: 1 }, { x: 0, y: 0 }]
   *
   * grid.unshift('invalid')      // 2
   * grid                         // [{ x: 1, y: 1 }, { x: 0, y: 0 }]
   */
  unshift(...hexes) {
    return super.unshift(...hexes.filter(Grid.isValidHex))
  }
}
