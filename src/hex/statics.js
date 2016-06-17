import { ORIENTATIONS } from './constants'

// private properties
let _orientation = ORIENTATIONS.FLAT
let _size = 1

export default {
    // `0` is returned if `-firstDimension - secondDimension` result in `-0`
    thirdDimension(firstDimension, secondDimension) {
        return -firstDimension - secondDimension || 0
    },

    // setter when called with newOrientation
    // getter when called without params
    orientation(newOrientation) {
        return newOrientation ?
            _orientation = ORIENTATIONS[newOrientation.toUpperCase()] || _orientation :
            ORIENTATIONS[_orientation]
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
        return this.isValidSize(newSize) ?
            _size = newSize :
            _size
    },

    isValidSize(size) {
        return size >= 0 && size !== null
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

    // returns the hexes in a straight line between itself and the given hex, inclusive
    // http://www.redblobgames.com/grids/hexagons/#line-drawing
    hexesBetween(hex, otherHex) {
        const distance = hex.distance(otherHex)

        if (distance === 1) {
            return [hex, otherHex]
        }

        const nudgedHex = hex.nudge()
        const nudgedOtherHex = otherHex.nudge()
        const step = 1.0 / Math.max(distance, 1)
        let hexes = []

        for (let i = 0; i <= distance; i++) {
            hexes.push(nudgedHex.lerp(nudgedOtherHex, step * i).round())
        }

        return hexes
    }
}
