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

export default {
    coordinates() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    },

    /**
     * Calculates the third coordinate from the other two.
     * @static
     *
     * @param   {Number} firstCoordinate  The first other coordinate.
     * @param   {Number} secondCoordinate The second other coordinate.
     *
     * @returns {Number}                  The third coordinate.
     */
    thirdCoordinate(firstCoordinate, secondCoordinate) {
        return unsignNegativeZero(-firstCoordinate - secondCoordinate)
    },

    /**
     * Determines if the passed size is valid. Should be a positive `Number`.
     *
     * @param   {Number} size   The size to validate.
     *
     * @returns {Boolean}       Wheter the size is valid.
     */
    isValidSize(size) {
        return size >= 0 && size !== null
    },

    /**
     * Returns the hexes in a straight line between itself and the given hex, inclusive.
     * Inspired by [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#line-drawing).
     *
     * @param   {Hex} hex   The hex to return the hexes in between to.
     *
     * @returns {Hex[]}     Hexes between the current and the passed hex.
     */
    hexesBetween(hex) {
        const distance = this.distance(hex)

        if (distance === 1) {
            return [this, hex]
        }

        const nudgedSelf = this.nudge()
        const nudgedOtherHex = hex.nudge()
        const step = 1.0 / Math.max(distance, 1)
        let hexes = []

        for (let i = 0; i <= distance; i++) {
            hexes.push(nudgedSelf.lerp(nudgedOtherHex, step * i).round())
        }

        return hexes
    },

    /**
     * When passed no (or falsy) parameters, it returns the current hex's orientation.
     * When passed an orientation, it sets the orientation of all hexes to that value.
     *
     * @param   {('flat'|'pointy')=} newOrientation Sets the orientation to this value.
     *
     * @returns {String}            The (new) current orientation.
     */
    orientation(newOrientation) {
        if (newOrientation) {
            return _orientation = ORIENTATIONS[newOrientation.toUpperCase()]
        }

        return ORIENTATIONS[_orientation]
    },

    /**
     * @returns {Boolean} Whether hexes have a pointy orientation.
     */
    isPointy() {
        return _orientation === ORIENTATIONS.POINTY
    },

    /**
     * @returns {Boolean} Whether hexes have a flat orientation.
     */
    isFlat() {
        return _orientation === ORIENTATIONS.FLAT
    },

    /**
     * When passed no (or falsy) parameters, it returns the current hex's size.
     * When passed a size, it sets the size of all hexes to that value.
     * Logs a warning when the size is invalid.
     *
     * @param   {Number=} newSize    Sets the size to this value.
     *
     * @returns {Number}            The (new) current size.
     */
    size(newSize) {
        if (arguments.length > 0) {
            return Hex.isValidSize(newSize) ?
                _size = newSize :
                console.warn(`Invalid size: ${newSize}`)
        }

        return _size
    },

    /**
     * @returns {Number}    The distance between opposite corners of a hex.
     */
    oppositeCornerDistance() {
        return _size * 2
    },

    /**
     * @returns {Number}    The distance between opposite sides of a hex.
     */
    oppositeSideDistance() {
        return Math.sqrt(3) / 2 * this.oppositeCornerDistance()
    },

    /**
     * When passed no (or falsy) parameters, it returns the result of the element interpolator called with the current hex.
     * When passed a template string, it sets the element interpolator to a function that returns this string.
     * When passed an element interpolator, it sets the element interpolator to this value.
     *
     * @todo Add validations (show warning if elementInterpolator isn't set).
     *
     * @param   {(String|Function)=} stringOrInterpolator   Sets the element interpolator to this value.
     *
     * @returns {String}                                    The interpolated element.
     */
    element(stringOrInterpolator) {
        if (is.string(stringOrInterpolator)) {
            _elementInterpolator = () => stringOrInterpolator
        } else if (is.function(stringOrInterpolator)) {
            _elementInterpolator = stringOrInterpolator
        }

        return _elementInterpolator(this)
    },

    /**
     * @returns {Number}    The (horizontal) width of any hex.
     */
    width() {
        return this.isPointy() ?
            this.oppositeSideDistance() :
            this.oppositeCornerDistance()
    },

    /**
     * @returns {Number}    The (vertical) height of any hex.
     */
    height() {
        return this.isPointy() ?
            this.oppositeCornerDistance() :
            this.oppositeSideDistance()
    },

    /**
     * @returns {Point} The relative center of any hex.
     */
    center() {
        return Point(this.width() / 2, this.height() / 2)
    },

    // setter when called with origin
    // getter when called without params; returns result of the elementInterpolator called with this
    /**
     * When passed no (or falsy) parameters, it returns the current hex's origin.
     * When passed an origin, it sets the origin of all hexes to that value.
     *
     * @param   {Point=} newOrigin  Sets the origin to this value.
     *
     * @returns {Point}             The (new) current origin or the hex's center if not yet set.
     */
    origin(newOrigin) {
        if (newOrigin) {
            return _origin = Point(newOrigin)
        }

        return _origin || this.center()
    },

    /**
     * @param {Hex} hex The hex to add to the current hex's.
     *
     * @returns {Hex}   The sum of the passed hex's coordinates to the current hex's.
     */
    add(hex) {
        return Hex(this.x + hex.x, this.y + hex.y, this.z + hex.z)
    },

    /**
     * @param   {Hex} hex The hex to subtract from the current hex's.
     *
     * @returns {Hex}   The difference between the passed hex's coordinates and the current hex's.
     */
    subtract(hex) {
        return Hex(this.x - hex.x, this.y - hex.y, this.z - hex.z)
    },

    /**
     * Returns the neighboring hex in the given direction.
     * Inspired by [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#neighbors).
     *
     * @param   {(0|1|2|3|4|5)}  [direction=0]  Any of the 6 directions. `0` is the Eastern direction (East-southeast when the hex is flat), `1` is 60° clockwise, and so forth.
     * @param   {Boolean} [diagonal=false]      Whether to look for a neighbor perpendicular to the hex's corner instead of its side.
     *
     * @returns {Hex}                           The neighboring hex.
     */
    neighbor(direction = 0, diagonal = false) {
        direction = direction % 6
        const coordinates = diagonal ?
            DIAGONAL_DIRECTION_COORDINATES[direction] :
            DIRECTION_COORDINATES[direction]

        return this.add(coordinates)
    },

    /**
     * Returns the amount of hexes between the current and the given hex.
     * Inspired by [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#distances).
     *
     * @param   {Hex} hex   The hex to return the distance to.
     *
     * @returns {Number}    The amount of hexes between the current and the one passed.
     */
    distance(hex) {
        const relativeHex = this.subtract(hex)
        return Math.max(
            Math.abs(relativeHex.x),
            Math.abs(relativeHex.y),
            Math.abs(relativeHex.z)
        )
    },

    /**
     * Rounds floating point hex coordinates to their nearest integer hex coordinates.
     * Inspired by [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#rounding).
     *
     * @returns {Hex}   A new hex with rounded coordinates.
     */
    round() {
        let roundedX = Math.round(this.x)
        let roundedY = Math.round(this.y)
        let roundedZ = Math.round(this.z)
        const diffX = Math.abs(this.x - roundedX)
        const diffY = Math.abs(this.y - roundedY)
        const diffZ = Math.abs(this.z - roundedZ)

        if (diffX > diffY && diffX > diffZ) {
            roundedX = Hex.thirdCoordinate(roundedY, roundedZ)
        } else if (diffY > diffZ) {
            roundedY = Hex.thirdCoordinate(roundedX, roundedZ)
        } else {
            roundedZ = Hex.thirdCoordinate(roundedX, roundedY)
        }

        return Hex(roundedX, roundedY, roundedZ)
    },

    /**
     * Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
     * More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).
     *
     * @param   {Hex} hex   The other hex to calculate the interpolation with.
     * @param   {Number} t  A "parameter" between 0 and 1.
     *
     * @returns {Hex}       A new hex (with possibly fractional coordinates).
     */
    lerp(hex, t) {
        return Hex(
            this.x * (1 - t) + hex.x * t,
            this.y * (1 - t) + hex.y * t,
            this.z * (1 - t) + hex.z * t
        )
    },

    /**
     * Returns a hex with a tiny offset to the current hex. Useful for interpolating in a consistent direction.
     * Inspired by [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#line-drawing).
     *
     * @returns {Hex}   A new hex with a minute offset.
     */
    nudge() {
        return this.add(Hex(1e-6, 1e-6, -2e-6))
    },

    /**
     * Converts the current hex to an (absolute) 2-dimensional {@link Point|point}. Uses the hex's origin.
     *
     * @returns {Point} The 2D point the hex corresponds to.
     */
    toPoint() {
        let x, y

        if (this.isPointy()) {
            x = this.size() * Math.sqrt(3) * (this.x + this.y / 2)
            y = this.size() * 3/2 * this.y
        } else if (this.isFlat()) {
            x = this.size() * 3/2 * this.x
            y = this.size() * Math.sqrt(3) * (this.y + this.x / 2)
        }

        return Point(x, y).subtract(this.origin())
    },

    // http://www.redblobgames.com/grids/hexagons/#pixel-to-hex
    /**
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @param   {Point} point   The point to convert from.
     *
     * @returns {Hex}           The hex (with rounded coordinates) the passed 2D point corresponds to.
     */
    fromPoint(point) {
        const size = this.size()
        let x, y

        // guarantee point is an actual Point instance
        point = Point(point)

        if (this.isPointy()) {
            x = (point.x * Math.sqrt(3)/3 - point.y / 3) / size
            y = point.y * 2/3 / size
        } else {
            x = point.x * 2/3 / size
            y = (-point.x / 3 + Math.sqrt(3)/3 * point.y) / size
        }

        return Hex(x, y).round()
    }
}
