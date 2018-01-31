/**
 * @private
 *
 * @param   {number} offset     The amount to offset (usually -1 or +1).
 * @param   {number} distance   The distance from 0 in a dimension (x, y or q, r).
 *
 * @returns {number}            The amount to offset in the dimension opposite of the passed `distance`.
 */
export function _offsetFromZero(offset, distance) {
    return (distance + offset * (distance & 1)) >> 1
}

/**
 * @private
 *
 * @param   {number} dividend   The amount to get the remainder from after division.
 * @param   {number} divisor    The amount to divide by.
 *
 * @returns {number}            `dividend % divisor`, except negative dividends "count back from 0".
 */
export function _signedModulo(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor
}

/**
 * @private
 *
 * @param   {string} value              A cardinal/ordinal compass point.
 * @param   {(pointy|flat)} orientation A hex orientation.
 *
 * @returns {(0|1|2|3|4|5)}             The number direction in the range 0..5.
 */
export function _toNumberDirection(value, orientation) {
    if (!/^(N|S)?(E|W)?$/i.test(value)) {
        throw new Error(`Invalid compass direction: ${value}. Choose from E, SE, S, SW, W, NW, N or NE.`)
    }

    orientation = orientation.toUpperCase()
    value = value.toUpperCase()

    if (orientation === 'POINTY' && ['N', 'S'].includes(value)) {
        throw new Error(`Direction ${value} is ambiguous for pointy hexes. Did you mean ${value}E or ${value}W?`)
    }
    if (orientation === 'FLAT' && ['E', 'W'].includes(value)) {
        throw new Error(`Direction ${value} is ambiguous for flat hexes. Did you mean N${value} or S${value}?`)
    }

    return {
        POINTY: { E: 0, SE: 1, SW: 2, W: 3, NW: 4, NE: 5 },
        FLAT: { SE: 0, S: 1, SW: 2, NW: 3, N: 4, NE: 5 }
    }[orientation][value]
}
