export const DIRECTION_COORDINATES = [
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 }
]

export const DIAGONAL_DIRECTION_COORDINATES = [
    { x: 2, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 2 },
    { x: -2, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -2 }
]

/**
 * The different orientations hexes can have.
 *
 * @constant
 * @type {Object}
 */
export const ORIENTATIONS = {
    /**
     * @enum {string} POINTY ⬢
     */
    POINTY: 'POINTY',
    /**
     * @enum {string} FLAT ⬣.
     */
    FLAT: 'FLAT'
}

export const EPSILON = { x: 1e-6, y: 1e-6 }
