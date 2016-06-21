import Hex from '.'
import {
    ORIENTATIONS,
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from './constants'
import Point from '../point'

// private properties
let _orientation
let _size
let _elementInterpolator

export default {
    coordinates() {
        const { x, y, z } = this
        return { x, y, z }
    },

    // setter when called with newOrientation
    // getter when called without params
    orientation(newOrientation) {
        if (newOrientation) {
            _orientation = ORIENTATIONS[newOrientation.toUpperCase()]
            return this
        }

        return ORIENTATIONS[_orientation]
    },

    isPointy() {
        return _orientation === ORIENTATIONS.POINTY
    },

    isFlat() {
        return _orientation === ORIENTATIONS.FLAT
    },

    // setter when called with newSize
    // getter when called without params
    size(newSize) {
        if (arguments.length > 0) {
            Hex.isValidSize(newSize) ?
                _size = newSize :
                console.warn(`Invalid size: ${newSize}`)

            return this
        }

        return _size
    },

    oppositeCornerDistance() {
        return _size * 2
    },

    oppositeSideDistance() {
        return Math.sqrt(3) / 2 * this.oppositeCornerDistance()
    },

    // setter when called with elementInterpolator
    // getter when called without params; returns result of the elementInterpolator called with this
    // TODO: add validations (show warning if elementInterpolator isn't set)
    // TODO: should also accept an element of type template literal?
    // TODO: should also accept a path to a template of type string?
    element(elementInterpolator) {
        if (elementInterpolator) {
            _elementInterpolator = elementInterpolator
            return this
        }

        return _elementInterpolator(this)
    },

    width() {
        return this.isPointy() ?
            this.oppositeSideDistance() :
            this.oppositeCornerDistance()
    },

    height() {
        return this.isPointy() ?
            this.oppositeCornerDistance() :
            this.oppositeSideDistance()
    },

    add(hex) {
        return Hex(this.x + hex.x, this.y + hex.y, this.z + hex.z)
    },

    subtract(hex) {
        return Hex(this.x - hex.x, this.y - hex.y, this.z - hex.z)
    },

    // direction is number in the range (0..5)
    // returns the neighboring hex
    // http://www.redblobgames.com/grids/hexagons/#neighbors
    neighbor(direction = 0, diagonal = false) {
        direction = direction % 6
        const coordinates = diagonal ?
            DIAGONAL_DIRECTION_COORDINATES[direction] :
            DIRECTION_COORDINATES[direction]

        return this.add(coordinates)
    },

    // returns the amount of hexes from itself to the given hex
    // http://www.redblobgames.com/grids/hexagons/#distances
    distance(hex) {
        const relativeHex = this.subtract(hex)
        return Math.max(
            Math.abs(relativeHex.x),
            Math.abs(relativeHex.y),
            Math.abs(relativeHex.z)
        )
    },

    // rounds floating point coordinates to their nearest integer coordinates
    // http://www.redblobgames.com/grids/hexagons/#rounding
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

    // returns an interpolation between self and the passed hex for a `t` between 0..1
    // why it's called 'lerp': https://en.wikipedia.org/wiki/Linear_interpolation#Applications
    lerp(hex, t) {
        return Hex(
            this.x * (1 - t) + hex.x * t,
            this.y * (1 - t) + hex.y * t,
            this.z * (1 - t) + hex.z * t
        )
    },

    // returns itself with a tiny offset, useful for interpolating in a consistent direction
    // see also: http://www.redblobgames.com/grids/hexagons/#line-drawing
    nudge() {
        return this.add(Hex(1e-6, 1e-6, -2e-6))
    },

    toPoint() {
        let x, y

        if (this.isPointy()) {
            x = this.size() * Math.sqrt(3) * (this.x + this.y / 2)
            y = this.size() * 3/2 * this.y
        } else if (this.isFlat()) {
            x = this.size() * 3/2 * this.x
            y = this.size() * Math.sqrt(3) * (this.y + this.x / 2)
        }

        return Point(x, y)
    }
}
