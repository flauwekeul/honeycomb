Object.assign(exports, {
    DIRECTION_COORDINATES: [
        [1, 0, -1],
        [1, -1, 0],
        [0, -1, 1],
        [-1, 0, 1],
        [-1, 1, 0],
        [0, 1, -1]
    ],

    DIAGONAL_DIRECTION_COORDINATES: [
        [2, -1, -1],
        [1, -2, 1],
        [-1, -1, 2],
        [-2, 1, 1],
        [-1, 2, -1],
        [1, 1, -2]
    ],

    ORIENTATIONS: {
        POINTY: Symbol('POINTY'),
        FLAT: Symbol('FLAT')
    }
})
