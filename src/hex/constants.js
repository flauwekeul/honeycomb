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

/**
 * @name OFFSETS
 *
 * @description
 * How rows/columns of hexes are placed relative to each other.
 *
 * An even offset:
 * * places **even rows** of **pointy hexes** half a hex right of the odd rows;
 * * places **even columns** of **flat hexes** half a hex down of the odd rows;
 *
 * An odd offset:
 * * places **odd rows** of **pointy hexes** half a hex right of the even rows;
 * * places **odd columns** of **flat hexes** half a hex down of the even rows;
 *
 * @see {@link https://www.redblobgames.com/grids/hexagons/#coordinates-offset|redblobgames.com}
 *
 * @readonly
 * @enum
 */
export const OFFSETS = {
    /**
     * @property EVEN (+1)
     */
    EVEN: 'EVEN',
    /**
     * @property ODD (-1)
     */
    ODD: 'ODD'
}

export const EPSILON = { x: 1e-6, y: 1e-6 }
