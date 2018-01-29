import { isObject } from 'axis.js'

import { DIRECTION_COORDINATES, DIAGONAL_DIRECTION_COORDINATES } from '../hex/constants'

export function get(targetHex) {
    return this[this.indexOf(targetHex)]
}

/**
 * @method Hex#hexesBetween
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
 *
 * @param {Hex} otherHex    The other hex.
 *
 * @returns {Hex[]}         Array of hexes from the current hex and up to the passed `otherHex`.
 */
export function hexesBetween(firstHex, lastHex) {
    const distance = firstHex.distance(lastHex)
    const step = 1.0 / Math.max(distance, 1)
    let hexes = []

    for (let i = 0; i <= distance; i++) {
        const hex = firstHex.nudge().lerp(lastHex.nudge(), step * i).round()
        hexes.push(this.get(hex))
    }

    return hexes
}

/**
 * @method Hex#neighbor
 *
 * @description
 * Returns the neighboring hex in the given direction.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#neighbors|redblobgames.com}
 *
 * @param {(0|1|2|3|4|5)}  [direction=0]    Any of the 6 directions. `0` is the Eastern direction (East-southeast when the hex is flat), `1` corresponds to 60° clockwise, `2` to 120° clockwise and so forth.
 * @param {boolean} [diagonal=false]        Whether to look for a neighbor opposite the hex's corner instead of its side. A direction of `0` means the top corner of the hex's right side when the hex is pointy and the right corner when the hex is flat.
 *
 * @returns {Hex}                           The neighboring hex.
 *
 * @example
 * import { Grid } from 'Honeycomb'
 * const Hex = Grid().Hex
 *
 * const hex = Hex()
 * hex.neighbor()           // { x: 1, y: -1 }, the hex across the 0th (right) side
 * hex.neighbor(2)          // { x: 0, y: 1 }, the hex across the 3rd (South West) side
 * hex.neighbor(3, true)    // { x: -2, y: 1 }, the hex opposite the 4th corner
 */
export function neighborOf(hexOrOptions, direction = 0, diagonal = false) {
    if (!isObject(hexOrOptions)) {
        throw new Error(`Cannot find neighbor of hex: ${hexOrOptions}.`)
    }

    let hex

    if (isObject(hexOrOptions.hex)) {
        ({ hex, direction = 0, diagonal = false } = hexOrOptions)
    } else {
        hex = hexOrOptions
    }

    // convert direction to a number between 0 and 5, even when initially negative
    direction = ((direction % 6) + 6) % 6
    const { q, r } = diagonal ?
        DIAGONAL_DIRECTION_COORDINATES[direction] :
        DIRECTION_COORDINATES[direction]

    return this.get(hex.cubeToCartesian({ q: hex.q + q, r: hex.r + r }))
}

/**
 * @method Hex#neighbors
 *
 * @description
 * Returns **all** neighboring hexes of the current hex.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#neighbors|redblobgames.com}
 *
 * @param {boolean} [diagonal=false]    Whether to return the diagonally neighboring hexes.
 *
 * @returns {Hex[]}                     An array of the 6 neighboring hexes.
 */
export function neighborsOf(hexOrOptions, diagonal = false) {
    if (!isObject(hexOrOptions)) {
        throw new Error(`Cannot find neighbors of hex: ${hexOrOptions}.`)
    }

    let hex

    if (isObject(hexOrOptions.hex)) {
        ({ hex, diagonal = false } = hexOrOptions)
    } else {
        hex = hexOrOptions
    }

    return (diagonal ? DIAGONAL_DIRECTION_COORDINATES : DIRECTION_COORDINATES)
        .map(({ q, r }) => this.get(hex.cubeToCartesian({ q: hex.q + q, r: hex.r + r })))
        .filter(Boolean)
}
