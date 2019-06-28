/**
 * Calculates the third cube coordinate from the other two. The sum of all three coordinates must be 0.
 *
 * @memberof Hex
 * @static
 *
 * @param {number} firstCoordinate  The first other cube coordinate.
 * @param {number} secondCoordinate The second other cube coordinate.
 *
 * @returns {number}                The third cube coordinate.
 *
 * @example
 * const Hex = Honeycomb.extendHex()
 * Hex.thirdCoordinate(3, -2)   // -1
 */
export function thirdCoordinate(firstCoordinate, secondCoordinate) {
  return -firstCoordinate - secondCoordinate
}
