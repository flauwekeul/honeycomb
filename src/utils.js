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
    return {
        POINTY: {
            E: 0,
            SE: 1,
            S: null,
            SW: 2,
            W: 3,
            NW: 4,
            N: null,
            NE: 5
        },
        FLAT: {
            E: null,
            SE: 0,
            S: 1,
            SW: 2,
            W: null,
            NW: 3,
            N: 4,
            NE: 5
        }
    }[orientation.toUpperCase()][value.toUpperCase()]
}
