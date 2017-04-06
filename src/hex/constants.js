export const DIRECTION_COORDINATES = [
    { x: 1, y: -1, z: 0 },
    { x: 1, y: 0, z: -1 },
    { x: 0, y: 1, z: -1 },
    { x: -1, y: 1, z: 0 },
    { x: -1, y: 0, z: 1 },
    { x: 0, y: -1, z: 1 }
]

export const DIAGONAL_DIRECTION_COORDINATES = [
    { x: 2, y: -1, z: -1 },
    { x: 1, y: 1, z: -2 },
    { x: -1, y: 2, z: -1 },
    { x: -2, y: 1, z: 1 },
    { x: -1, y: -1, z: 2 },
    { x: 1, y: -2, z: 1 }
]

/**
 * The different orientations hexes can have.
 *
 * @constant
 * @type {Object}
 */
export const ORIENTATIONS = {
    /**
     * @readOnly
     * @enum {String} POINTY ⬢
     */
    POINTY: 'POINTY',
    /**
     * @readOnly
     * @enum {String} FLAT ⬣.
     */
    FLAT: 'FLAT'
}

export const EPSILON = { x: 1e-6, y: 1e-6, z: -2e-6 }
