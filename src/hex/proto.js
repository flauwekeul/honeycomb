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

    thirdCoordinate(firstCoordinate, secondCoordinate) {
        return unsignNegativeZero(-firstCoordinate - secondCoordinate)
    },

    isValidSize(size) {
        return size >= 0 && size !== null
    },

    // returns the hexes in a straight line between itself and the given hex, inclusive
    // http://www.redblobgames.com/grids/hexagons/#line-drawing
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

    // setter when called with newOrientation
    // getter when called without params
    orientation(newOrientation) {
        if (newOrientation) {
            return _orientation = ORIENTATIONS[newOrientation.toUpperCase()]
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
            return Hex.isValidSize(newSize) ?
                _size = newSize :
                console.warn(`Invalid size: ${newSize}`)
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
    element(stringOrInterpolator) {
        switch(true) {
            case is.string(stringOrInterpolator):
                _elementInterpolator = () => stringOrInterpolator
                break
            case is.function(stringOrInterpolator):
                _elementInterpolator = stringOrInterpolator
                break
            case arguments.length === 0:
                return _elementInterpolator(this)
        }
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

    // returns relative center of the hex
    center() {
        return Point(this.width() / 2, this.height() / 2)
    },

    // setter when called with origin
    // getter when called without params; returns result of the elementInterpolator called with this
    origin(newOrigin) {
        if (newOrigin) {
            return _origin = Point(newOrigin)
        }

        return _origin || this.center()
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

        return Point(x, y).subtract(this.origin())
    },

    // http://www.redblobgames.com/grids/hexagons/#pixel-to-hex
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
