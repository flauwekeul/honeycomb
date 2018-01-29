import { isArray, isObject, isString } from 'axis.js'

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

export function neighborsOfFactory({ _signedModulo, _toNumberDirection }) {
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
    return function neighborsOf(hexOrOptions, directions = 'all', diagonal = false) {
        if (!isObject(hexOrOptions)) {
            throw new Error(`Cannot find neighbors of hex: ${hexOrOptions}.`)
        }

        let hex, direction

        // get arguments from hexOrOptions if it contains a hex property
        if (isObject(hexOrOptions.hex)) {
            ({ hex, direction, directions, diagonal } = hexOrOptions)
            // bind `this` so that the function doesn't lose its context to the grid instance
            return neighborsOf.call(this, hex, directions || direction, diagonal)
        } else {
            hex = hexOrOptions
        }

        if (directions === 'all') {
            directions = [0, 1, 2, 3, 4, 5]
        } else {
            // if singular direction is passed, convert it to an array, so that the following code can always use an array
            if (!isArray(directions)) {
                directions = [directions]
            }

            directions = directions.map(direction => {
                if (isString(direction)) {
                    direction = _toNumberDirection(direction, hex.orientation)
                }

                if (direction < 0 || direction > 5) {
                    direction = _signedModulo(direction, 6)
                }

                return direction
            })
        }

        const coordinates = diagonal ? DIAGONAL_DIRECTION_COORDINATES : DIRECTION_COORDINATES

        return directions
            .map(direction => {
                const { q, r } = coordinates[direction]
                return this.get(hex.cubeToCartesian({ q: hex.q + q, r: hex.r + r }))
            })
            .filter(Boolean)
    }
}
