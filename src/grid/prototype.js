import { isString } from 'axis.js'

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

export function neighborsOfFactory({ Grid, signedModulo, compassToNumberDirection }) {
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
    return function neighborsOf(hex, directions = 'all', diagonal = false) {
        if (!Grid.isValidHex(hex)) {
            throw new Error(`Invalid hex: ${hex}.`)
        }

        const coordinates = diagonal ? DIAGONAL_DIRECTION_COORDINATES : DIRECTION_COORDINATES

        if (directions === 'all') {
            directions = [0, 1, 2, 3, 4, 5]
        }

        return directions = []
            // ensure directions is an array
            .concat(directions)
            .map(direction => {
                // todo: move this to a util, also grid/statics.js#277
                if (isString(direction)) {
                    direction = compassToNumberDirection(direction, hex.orientation)
                }

                if (direction < 0 || direction > 5) {
                    direction = signedModulo(direction, 6)
                }

                const { q, r } = coordinates[direction]
                return this.get(hex.cubeToCartesian({ q: hex.q + q, r: hex.r + r }))
            })
            .filter(Boolean)
    }
}
