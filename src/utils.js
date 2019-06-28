import { isNumber, isObject } from 'axis.js'

/**
 * @private
 *
 * @param   {number} offset     The amount to offset (usually -1 or +1).
 * @param   {number} distance   The distance from 0 in a dimension (x, y or q, r).
 *
 * @returns {number}            The amount to offset in the dimension opposite of the passed `distance`.
 */
export function offsetFromZero(offset, distance) {
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
export function signedModulo(dividend, divisor) {
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
export function compassToNumberDirection(value, orientation) {
  if (!/^(N|S)?(E|W)?$/i.test(value)) {
    throw new Error(`Invalid compass direction: ${value}. Choose from E, SE, S, SW, W, NW, N or NE.`)
  }

  orientation = orientation.toLowerCase()
  value = value.toUpperCase()

  if (orientation === 'pointy' && ['N', 'S'].includes(value)) {
    throw new Error(`Direction ${value} is ambiguous for pointy hexes. Did you mean ${value}E or ${value}W?`)
  }
  if (orientation === 'flat' && ['E', 'W'].includes(value)) {
    throw new Error(`Direction ${value} is ambiguous for flat hexes. Did you mean N${value} or S${value}?`)
  }

  /**
   * There's an (approximate) compass direction for each side of a hex. The right side of a pointy hex has the east (`'E'`) compass direction.
   * The bottom right side the southeast (`'SE'`) direction, etc. This also means that pointy hexes don't have a north and south compass direction
   * and flat hexes don't have a west and east compass direction.
   *
   * Number directions map to a side of a hex. A pointy hex's right side is `0`, its bottom right side `1`, its bottom left side `2`, etc.
   * Number directions of flat hexes start at their bottom right side (`0`), their bottom side is `1`, etc.
   *
   * @typedef {string} COMPASS_DIRECTION
   *
   * @readonly
   * @enum {COMPASS_DIRECTION}
   *
   * @property {COMPASS_DIRECTION} E  → east
   * @property {COMPASS_DIRECTION} SE ↘ southeast
   * @property {COMPASS_DIRECTION} S  ↓ south
   * @property {COMPASS_DIRECTION} SW ↙ southwest
   * @property {COMPASS_DIRECTION} W  ← west
   * @property {COMPASS_DIRECTION} NW ↖ northwest
   * @property {COMPASS_DIRECTION} N  ↑ north
   * @property {COMPASS_DIRECTION} NE ↗ northeast
   */
  return {
    pointy: { E: 0, SE: 1, SW: 2, W: 3, NW: 4, NE: 5 },
    flat: { SE: 0, S: 1, SW: 2, NW: 3, N: 4, NE: 5 },
  }[orientation][value]
}

export function ensureXY(x, y) {
  if (!isNumber(x) && !isNumber(y)) {
    x = y = 0
  } else if (!isNumber(x)) {
    x = y
  } else if (!isNumber(y)) {
    y = x
  }

  return { x, y }
}

export function normalizeRadiuses(size, isPointy) {
  if (isObject(size)) {
    if (isNumber(size.xRadius) && isNumber(size.yRadius)) {
      return size
    }

    const { width, height } = size
    if (isNumber(width) && isNumber(height)) {
      return isPointy
        ? { xRadius: width / Math.sqrt(3), yRadius: height / 2 }
        : { xRadius: width / 2, yRadius: height / Math.sqrt(3) }
    }
  }

  if (isNumber(size)) {
    return { xRadius: size, yRadius: size }
  }

  throw new Error(`Invalid size: ${size}. Set it as a number or as an object containing width and height.`)
}
