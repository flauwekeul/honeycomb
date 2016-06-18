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

export default {
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
        return Hex(this.q + hex.q, this.r + hex.r, this.s + hex.s)
    },

    subtract(hex) {
        return Hex(this.q - hex.q, this.r - hex.r, this.s - hex.s)
    },

    // direction is number in the range (0..5)
    // returns the neighboring hex
    // http://www.redblobgames.com/grids/hexagons/#neighbors
    neighbor(direction = 0, diagonal = false) {
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
            Math.abs(relativeHex.q),
            Math.abs(relativeHex.r),
            Math.abs(relativeHex.s)
        )
    },

    // rounds floating point coordinates to their nearest integer coordinates
    // http://www.redblobgames.com/grids/hexagons/#rounding
    round() {
        let roundedX = Math.round(this.q)
        let roundedY = Math.round(this.r)
        let roundedZ = Math.round(this.s)
        const diffX = Math.abs(this.q - roundedX)
        const diffY = Math.abs(this.r - roundedY)
        const diffZ = Math.abs(this.s - roundedZ)

        if (diffX > diffY && diffX > diffZ) {
            roundedX = Hex.thirdDimension(roundedY, roundedZ)
        } else if (diffY > diffZ) {
            roundedY = Hex.thirdDimension(roundedX, roundedZ)
        } else {
            roundedZ = Hex.thirdDimension(roundedX, roundedY)
        }

        return Hex(roundedX, roundedY, roundedZ)
    },

    // returns an interpolation between self and the passed hex for a `t` between 0..1
    // why it's called 'lerp': https://en.wikipedia.org/wiki/Linear_interpolation#Applications
    lerp(hex, t) {
        return Hex(
            this.q * (1 - t) + hex.q * t,
            this.r * (1 - t) + hex.r * t,
            this.s * (1 - t) + hex.s * t
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
            x = this.size() * Math.sqrt(3) * (this.q + this.s / 2)
            y = this.size() * 3/2 * this.s
        } else if (this.isFlat()) {
            x = this.size() * 3/2 * this.q
            y = this.size() * Math.sqrt(3) * (this.s + this.q / 2)
        }

        return Point(x, y)
    }
}
