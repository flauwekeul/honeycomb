export function addFactory({ Point }) {
  /**
     * @memberof Point#

     * @param {(number|number[]|point)} [pointOrX=] The x coordinate or an array with 2 numbers or an object with an `x` and `y` coordinate.
     * @param {number} [pointOrX.x=]                The x coordinate.
     * @param {number} [pointOrX.y=]                The y coordinate.
     * @param {number} [y=]                         The y coordinate.
     *
     * @returns {point}         The sum of the passed point's coordinates to the current point's.
     */
  return function add(pointOrX, y) {
    let x
    ;({ x, y } = Point(pointOrX, y))
    return Point(this.x + x, this.y + y)
  }
}

export function subtractFactory({ Point }) {
  /**
   * @memberof Point#
   *
   * @param {(number|number[]|point)} [pointOrX=] The x coordinate or an array with 2 numbers or an object with an `x` and `y` coordinate.
   * @param {number} [pointOrX.x=]                The x coordinate.
   * @param {number} [pointOrX.y=]                The y coordinate.
   * @param {number} [y=]                         The y coordinate.
   *
   * @returns {point}         The difference between the passed point's coordinates and the current point's.
   */
  return function subtract(pointOrX, y) {
    let x
    ;({ x, y } = Point(pointOrX, y))
    return Point(this.x - x, this.y - y)
  }
}

export function multiplyFactory({ Point }) {
  /**
   * @memberof Point#
   *
   * @param {(number|number[]|point)} [pointOrX=] The x coordinate or an array with 2 numbers or an object with an `x` and `y` coordinate.
   * @param {number} [pointOrX.x=]                The x coordinate.
   * @param {number} [pointOrX.y=]                The y coordinate.
   * @param {number} [y=]                         The y coordinate.
   *
   * @returns {point}         The multiplication of the passed point's coordinates and the current point's.
   */
  return function multiply(pointOrX, y) {
    let x
    ;({ x, y } = Point(pointOrX, y))
    return Point(this.x * x, this.y * y)
  }
}

export function divideFactory({ Point }) {
  /**
   * @memberof Point#
   *
   * @param {(number|number[]|point)} [pointOrX=] The x coordinate or an array with 2 numbers or an object with an `x` and `y` coordinate.
   * @param {number} [pointOrX.x=]                The x coordinate.
   * @param {number} [pointOrX.y=]                The y coordinate.
   * @param {number} [y=]                         The y coordinate.
   *
   * @returns {point}         The division of the current point's coordinates and the passed point's.
   */
  return function divide(pointOrX, y) {
    let x
    ;({ x, y } = Point(pointOrX, y))
    return Point(this.x / x, this.y / y)
  }
}
