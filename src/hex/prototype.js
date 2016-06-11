import Hex from '.'
import Point from '../point'
import {
    ORIENTATIONS,
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from './constants'

export default {
    hasSize() {
        return Hex.size >= 0 && Hex.size !== null
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
        if (!this.hasSize()) {
            throw new Error(`No valid size set: ${ Hex.size }`)
        }

        let x, y

        if (Hex.isPointy()) {
            x = Hex.size * Math.sqrt(3) * (this.x + this.z / 2)
            y = Hex.size * 3/2 * this.z
        } else if (Hex.isFlat()) {
            x = Hex.size * 3/2 * this.x
            y = Hex.size * Math.sqrt(3) * (this.z + this.x / 2)
        }

        return Point(x, y)
    }
}
