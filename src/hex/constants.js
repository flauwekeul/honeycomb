/**
 * The different orientations hexes can have.
 *
 * @readonly
 * @enum
 */
export const ORIENTATION = {
    /**
     * @property pointy ⬢
     */
    pointy: 'pointy',
    /**
     * @property flat ⬣.
     */
    flat: 'flat'
}

/*
 * @name OFFSET
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
export const OFFSET = {
    /*
     * @property even (+1)
     */
    even: 1,
    /*
     * @property odd (-1)
     */
    odd: -1
}

export const DIRECTION_COORDINATES = [
    { q: 1, r: 0 },
    { q: 0, r: 1 },
    { q: -1, r: 1 },
    { q: -1, r: 0 },
    { q: 0, r: -1 },
    { q: 1, r: -1 }
]

export const DIAGONAL_DIRECTION_COORDINATES = [
    { q: 2, r: -1 },
    { q: 1, r: 1 },
    { q: -1, r: 2 },
    { q: -2, r: 1 },
    { q: -1, r: -1 },
    { q: 1, r: -2 }
]

export const EPSILON = { x: 1e-6, y: 1e-6 }
