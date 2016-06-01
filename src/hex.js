import {
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from './constants'

export default class Hex {
    // accepts cube coordinates
    // http://www.redblobgames.com/grids/hexagons/#coordinates
    constructor(q, r, s) {
        this.q = q
        this.r = r
        this.s = s
    }

    add(hex) {
        return new Hex(this.q + hex.q, this.r + hex.r, this.s + hex.s)
    }

    subtract(hex) {
        return new Hex(this.q - hex.q, this.r - hex.r, this.s - hex.s)
    }

    // direction is number in the range (0..5)
    // returns the neighboring hex
    // http://www.redblobgames.com/grids/hexagons/#neighbors
    neighbor(direction = 0, diagonal = false) {
        const coordinates = diagonal ?
            DIAGONAL_DIRECTION_COORDINATES[direction] :
            DIRECTION_COORDINATES[direction]

        return this.add(new Hex(...coordinates))
    }

    // returns distance (steps) to given hex
    // http://www.redblobgames.com/grids/hexagons/#distances
    distance(hex) {
        const relativeHex = this.subtract(hex)
        return Math.max(
            Math.abs(relativeHex.q),
            Math.abs(relativeHex.r),
            Math.abs(relativeHex.s)
        )
    }
}
