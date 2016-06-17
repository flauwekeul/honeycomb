export const DIRECTION_COORDINATES = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 }
]

export const DIAGONAL_DIRECTION_COORDINATES = [
    { q: 2, r: -1, s: -1 },
    { q: 1, r: -2, s: 1 },
    { q: -1, r: -1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 2, s: -1 },
    { q: 1, r: 1, s: -2 }
]

export const ORIENTATIONS = {
    POINTY: 'POINTY',
    FLAT: 'FLAT'
}
