/**
 * @method Hex.thirdCoordinate
 *
 * @description
 * Calculates the third coordinate from the other two. The sum of all three coordinates must be 0.
 *
 * @param   {number} firstCoordinate  The first other coordinate.
 * @param   {number} secondCoordinate The second other coordinate.
 *
 * @returns {number}                  The third coordinate.
 */
export function thirdCoordinate(firstCoordinate, secondCoordinate) {
    return -firstCoordinate - secondCoordinate
}
