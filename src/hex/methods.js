import { is, unsignNegativeZero } from '../utils'

import {
    ORIENTATIONS,
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from './constants'
import Hex from '.'
import Point from '../point'

// private properties
let _orientation
let _size
let _elementInterpolator
let _origin

const thirdCoordinate = thirdCoordinateFactory({ unsignNegativeZero })

export default ({
    coordinates,
    thirdCoordinate,
    isValidSize,
    hexesBetween,
    orientation,
    isPointy,
    isFlat,
    size: sizeFactory({ Hex }),
    oppositeCornerDistance,
    oppositeSideDistance,
    element: elementFactory({ is }),
    width,
    height,
    center,
    origin: originFactory({ Point }),
    add: addFactory({ Hex }),
    subtract: subtractFactory({ Hex }),
    neighbor,
    distance,
    round: roundFactory({ Hex }),
    lerp: lerpFactory({ Hex }),
    nudge: nudgeFactory({ Hex }),
    toPoint: toPointFactory({ Point }),
    fromPoint: fromPointFactory({ Point, Hex })
})

export function coordinates(hex) {
    return {
        x: hex.x,
        y: hex.y,
        z: hex.z
    }
}

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
    const distance = firstHex.distance(secondHex)

    if (distance === 1) {
        return [firstHex, secondHex]
    }

    const nudgedFirst = firstHex.nudge()
    const nudgedSecond = secondHex.nudge()
    const step = 1.0 / Math.max(distance, 1)
    let hexes = []

    for (let i = 0; i <= distance; i++) {
        hexes.push(nudgedFirst.lerp(nudgedSecond, step * i).round())
    }

    return hexes
}

/**
 * @method Hex#orientation
 *
 * @description
 * When passed no (or falsy) parameters, it returns the current hex's orientation.
 * When passed an orientation, it sets the orientation of all hexes to that value.
 *
 * @param   {('flat'|'pointy')=} newOrientation Sets the orientation to this value.
 *
 * @returns {String}            The (new) current orientation.
 */
export function orientation(newOrientation) {
    if (newOrientation) {
        return _orientation = ORIENTATIONS[newOrientation.toUpperCase()]
    }

    return ORIENTATIONS[_orientation]
}

/**
 * @method Hex#isPointy
 * @returns {Boolean} Whether hexes have a pointy orientation.
 */
export function isPointy() {
    return _orientation === ORIENTATIONS.POINTY
}

/**
 * @method Hex#isFlat
 * @returns {Boolean} Whether hexes have a flat orientation.
 */
export function isFlat() {
    return _orientation === ORIENTATIONS.FLAT
}

export function sizeFactory({ Hex }) {
    /**
     * @method Hex#size
     *
     * @description
     * When passed no (or falsy) parameters, it returns the current hex's size.
     * When passed a size, it sets the size of all hexes to that value.
     * Logs a warning when the size is invalid.
     *
     * @param   {Number=} newSize    Sets the size to this value.
     *
     * @returns {Number}            The (new) current size.
     */
    return function size(newSize) {
        if (arguments.length > 0) {
            return Hex.isValidSize(newSize) ?
                _size = newSize :
                console.warn(`Invalid size: ${newSize}`)
        }

        return _size
    }
}

/**
 * @method Hex#oppositeCornerDistance
 * @returns {Number}    The distance between opposite corners of a hex.
 */
export function oppositeCornerDistance() {
    return _size * 2
}

/**
 * @method Hex#oppositeSideDistance
 * @returns {Number}    The distance between opposite sides of a hex.
 */
export function oppositeSideDistance() {
    return Math.sqrt(3) / 2 * oppositeCornerDistance()
}

export function elementFactory({ is }) {
    /**
     * @method Hex#element
     *
     * @description
     * When passed no (or falsy) parameters, it returns the result of the element interpolator called with the current hex.
     * When passed a template string, it sets the element interpolator to a function that returns this string.
     * When passed an element interpolator, it sets the element interpolator to this value.
     *
     * @todo Add validations (show warning if elementInterpolator isn't set).
     * @todo Add examples.
     *
     * @param   {(String|Function)=} stringOrInterpolator   Sets the element interpolator to this value.
     *
     * @returns {String}                                    The interpolated element.
     */
    return function element(stringOrInterpolator) {
        if (is.string(stringOrInterpolator)) {
            _elementInterpolator = () => stringOrInterpolator
        } else if (is.function(stringOrInterpolator)) {
            _elementInterpolator = stringOrInterpolator
        }

        return _elementInterpolator(this)
    }
}

/**
 * @method Hex#width
 * @returns {Number}    The (horizontal) width of any hex.
 */
export function width() {
    return isPointy() ?
        oppositeSideDistance() :
        oppositeCornerDistance()
}

/**
 * @method Hex#height
 * @returns {Number}    The (vertical) height of any hex.
 */
export function height() {
    return isPointy() ?
        oppositeCornerDistance() :
        oppositeSideDistance()
}

/**
 * @method Hex#center
 * @returns {Point} The relative center of any hex.
 */
export function center(hex) {
    return Point(hex.width() / 2, hex.height() / 2)
}

export function originFactory({ Point }) {
    /**
     * @method Hex#origin
     *
     * @description
     * When passed no (or falsy) parameters, it returns the current hex's origin.
     * When passed an origin, it sets the origin of all hexes to that value.
     *
     * @param   {Point=} newOrigin  Sets the origin to this value.
     *
     * @returns {Point}             The (new) current origin or the hex's center if not yet set.
     */
    return function origin(newOrigin) {
        if (newOrigin) {
            return _origin = Point(newOrigin)
        }

        return _origin || center(this)
    }
}

export function addFactory({ Hex }) {
    /**
     * @method Hex#add
     * @param {Hex} hex The hex to add to the current hex.
     *
     * @returns {Hex}   The sum of the passed hex's coordinates to the current hex's.
     */
    return function add(hex) {
        return Hex(this.x + hex.x, this.y + hex.y, this.z + hex.z)
    }
}

export function subtractFactory({ Hex }) {
    /**
     * @method Hex#subtract
     * @param   {Hex} hex   The hex to subtract from the current hex.
     *
     * @returns {Hex}       The difference between the passed hex's coordinates and the current hex's.
     */
    return function subtract(hex) {
        return Hex(this.x - hex.x, this.y - hex.y, this.z - hex.z)
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
export function neighbor(direction = 0, diagonal = false) {
    direction = direction % 6
    const coordinates = diagonal ?
        DIAGONAL_DIRECTION_COORDINATES[direction] :
        DIRECTION_COORDINATES[direction]

    return this.add(coordinates)
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
export function distance(hex) {
    const relativeHex = this.subtract(hex)
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
    return function round() {
        let roundedX = Math.round(this.x)
        let roundedY = Math.round(this.y)
        let roundedZ = Math.round(this.z)
        const diffX = Math.abs(this.x - roundedX)
        const diffY = Math.abs(this.y - roundedY)
        const diffZ = Math.abs(this.z - roundedZ)

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
    return function lerp(hex, t) {
        return Hex(
            this.x * (1 - t) + hex.x * t,
            this.y * (1 - t) + hex.y * t,
            this.z * (1 - t) + hex.z * t
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
    return function nudge() {
        return this.add(Hex(1e-6, 1e-6, -2e-6))
    }
}

export function toPointFactory({ Point }) {
    /**
     * @method Hex#toPoint
     *
     * @description
     * Converts the current hex to an (absolute) 2-dimensional {@link Point|point}. Uses the hex's origin.
     *
     * @returns {Point} The 2D point the hex corresponds to.
     */
    return function toPoint() {
        let x, y

        if (isPointy()) {
            x = this.size() * Math.sqrt(3) * (this.x + this.y / 2)
            y = this.size() * 3/2 * this.y
        } else if (isFlat()) {
            x = this.size() * 3/2 * this.x
            y = this.size() * Math.sqrt(3) * (this.y + this.x / 2)
        }

        return Point(x, y).subtract(this.origin())
    }
}

export function fromPointFactory({ Point, Hex }) {
    /**
     * @method Hex#fromPoint
     *
     * @description
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param   {Point} point   The point to convert from.
     *
     * @returns {Hex}           The hex (with rounded coordinates) the passed 2D point corresponds to.
     */
    return function fromPoint(point) {
        const size = this.size()
        let x, y

        // guarantee point is an actual Point instance
        point = Point(point)

        if (isPointy()) {
            x = (point.x * Math.sqrt(3)/3 - point.y / 3) / size
            y = point.y * 2/3 / size
        } else {
            x = point.x * 2/3 / size
            y = (-point.x / 3 + Math.sqrt(3)/3 * point.y) / size
        }

        return Hex(x, y).round()
    }
}
