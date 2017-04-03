import { unsignNegativeZero } from '../utils'
import {
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES,
    EPSILON
} from './constants'
import Hex from './index'

const thirdCoordinate = thirdCoordinateFactory({ unsignNegativeZero })
const add = addFactory({ Hex })
const subtract = subtractFactory({ Hex })
const round = roundFactory({ Hex })
const lerp = lerpFactory({ Hex })
const nudge = nudgeFactory({ Hex })

export default ({
    thirdCoordinate,
    isValidSize,
    hexesBetween,
    add,
    subtract,
    neighbor,
    distance,
    round,
    lerp,
    nudge
})

export function thirdCoordinateFactory({ unsignNegativeZero }) {
    /**
     * @method Hex.thirdCoordinate
     *
     * @description
     * Calculates the third coordinate from the other two. The sum of all three coordinates should always be 0.
     *
     * @param   {Number} firstCoordinate  The first other coordinate.
     * @param   {Number} secondCoordinate The second other coordinate.
     *
     * @returns {Number}                  The third coordinate.
     */
    return function thirdCoordinate(firstCoordinate, secondCoordinate) {
        return unsignNegativeZero(-firstCoordinate - secondCoordinate)
    }
}

/**
 * @method Hex.isValidSize
 *
 * @description
 * Determines if the passed size is valid. Should be a positive `Number`.
 *
 * @param   {Number} size   The size to validate.
 *
 * @returns {Boolean}       Wheter the size is valid.
 */
export function isValidSize(size) {
    return size >= 0 && size !== null
}

/**
 * @method Hex#hexesBetween
 *
 * @description
 * Returns the hexes in a straight line between itself and the given hex, inclusive.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
 *
 * @param   {Hex} hex   The hex to return the hexes in between to.
 *
 * @returns {Hex[]}     Hexes between the current and the passed hex.
 */
export function hexesBetween(firstHex, secondHex) {
    const _distance = distance(firstHex, secondHex)

    if (_distance === 1) {
        return [firstHex, secondHex]
    }

    const step = 1.0 / Math.max(_distance, 1)
    let hexes = []

    for (let i = 0; i <= _distance; i++) {
        hexes.push(round(lerp(nudge(firstHex), nudge(secondHex), step * i)))
    }

    return hexes
}

export function addFactory({ Hex }) {
    /**
     * @method Hex#add
     * @param {Hex} hex The hex to add to the current hex.
     *
     * @returns {Hex}   The sum of the passed hex's coordinates to the current hex's.
     */
    return function add(firstHex, secondHex) {
        return Hex(
            firstHex.x + secondHex.x,
            firstHex.y + secondHex.y,
            firstHex.z + secondHex.z
        )
    }
}

export function subtractFactory({ Hex }) {
    /**
     * @method Hex#subtract
     * @param   {Hex} hex   The hex to subtract from the current hex.
     *
     * @returns {Hex}       The difference between the passed hex's coordinates and the current hex's.
     */
    return function subtract(firstHex, secondHex) {
        return Hex(
            firstHex.x - secondHex.x,
            firstHex.y - secondHex.y,
            firstHex.z - secondHex.z
        )
    }
}

/**
 * @method Hex#neighbor
 *
 * @description
 * Returns the neighboring hex in the given direction.
 *
 * @todo Add examples.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#neighbors|redblobgames.com}
 *
 * @param   {(0|1|2|3|4|5)}  [direction=0]  Any of the 6 directions. `0` is the Eastern direction (East-southeast when the hex is flat), `1` is 60° clockwise, and so forth.
 * @param   {Boolean} [diagonal=false]      Whether to look for a neighbor perpendicular to the hex's corner instead of its side.
 *
 * @returns {Hex}                           The neighboring hex.
 */
export function neighbor(hex, direction = 0, diagonal = false) {
    direction = direction % 6
    const coordinates = diagonal ?
        DIAGONAL_DIRECTION_COORDINATES[direction] :
        DIRECTION_COORDINATES[direction]

    return add(hex, coordinates)
}

/**
 * @method Hex#distance
 *
 * @description
 * Returns the amount of hexes between the current and the given hex.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#distances|redblobgames.com}
 *
 * @param   {Hex} hex   The hex to return the distance to.
 *
 * @returns {Number}    The amount of hexes between the current and the one passed.
 */
export function distance(firstHex, secondHex) {
    const relativeHex = subtract(firstHex, secondHex)
    return Math.max(
        Math.abs(relativeHex.x),
        Math.abs(relativeHex.y),
        Math.abs(relativeHex.z)
    )
}

export function roundFactory({ Hex }) {
    /**
     * @method Hex#round
     *
     * @description
     * Rounds floating point hex coordinates to their nearest integer hex coordinates.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#rounding|redblobgames.com}
     *
     * @returns {Hex}   A new hex with rounded coordinates.
     */
    return function round(hex) {
        let roundedX = Math.round(hex.x)
        let roundedY = Math.round(hex.y)
        let roundedZ = Math.round(hex.z)
        const diffX = Math.abs(hex.x - roundedX)
        const diffY = Math.abs(hex.y - roundedY)
        const diffZ = Math.abs(hex.z - roundedZ)

        if (diffX > diffY && diffX > diffZ) {
            roundedX = thirdCoordinate(roundedY, roundedZ)
        } else if (diffY > diffZ) {
            roundedY = thirdCoordinate(roundedX, roundedZ)
        } else {
            roundedZ = thirdCoordinate(roundedX, roundedY)
        }

        return Hex(roundedX, roundedY, roundedZ)
    }
}

export function lerpFactory({ Hex }) {
    /**
     * @method Hex#lerp
     *
     * @description
     * Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
     * More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).
     *
     * @param   {Hex} hex   The other hex to calculate the interpolation with.
     * @param   {Number} t  A "parameter" between 0 and 1.
     *
     * @returns {Hex}       A new hex (with possibly fractional coordinates).
     */
    return function lerp(firstHex, secondHex, t) {
        return Hex(
            firstHex.x * (1 - t) + secondHex.x * t,
            firstHex.y * (1 - t) + secondHex.y * t,
            firstHex.z * (1 - t) + secondHex.z * t
        )
    }
}

export function nudgeFactory({ Hex }) {
    /**
     * @method Hex#nudge
     *
     * @description
     * Returns a hex with a tiny offset to the current hex. Useful for interpolating in a consistent direction.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
     *
     * @returns {Hex}   A new hex with a minute offset.
     */
    return function nudge(hex) {
        return add(hex, Hex(EPSILON))
    }
}
