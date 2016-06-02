// Inspired by http://www.redblobgames.com/grids/hexagons/codegen/output/lib.js

import {
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from './constants'

const proto = {
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

        return this.add(Hex(...coordinates))
    },

    // returns distance (steps) to given hex
    // http://www.redblobgames.com/grids/hexagons/#distances
    distance(hex) {
        const relativeHex = this.subtract(hex)
        return Math.max(
            Math.abs(relativeHex.x),
            Math.abs(relativeHex.y),
            Math.abs(relativeHex.z)
        )
    }
}


// accepts axial or cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
export default function Hex(x, y, z = (-x - y)) {
    // TODO: validate z. It should always be (-x - y)
    return Object.assign(Object.create(proto), { x, y, z })
}
