export function addFactory({ Point }) {
    /**
     * @memberof Point#

     * @param   {point} point   The point to add to the current point.
     * @returns {point}         The sum of the passed point's coordinates to the current point's.
     */
    return function add(point) {
        return Point(this.x + point.x, this.y + point.y)
    }
}

export function subtractFactory({ Point }) {
    /**
     * @memberof Point#
     *
     * @param   {point} point   The point to subtract from the current point.
     * @returns {point}         The difference between the passed point's coordinates and the current point's.
     */
    return function subtract(point) {
        return Point(this.x - point.x, this.y - point.y)
    }
}

export function multiplyFactory({ Point }) {
    /**
     * @memberof Point#
     *
     * @param   {point} point   The point to multiply with the current point.
     * @returns {point}         The multiplication of the passed point's coordinates and the current point's.
     */
    return function multiply(point) {
        return Point(this.x * point.x, this.y * point.y)
    }
}

export function divideFactory({ Point }) {
    /**
     * @memberof Point#
     *
     * @param   {point} point   The point where the current point is divided by.
     * @returns {point}         The division of the current point's coordinates and the passed point's.
     */
    return function divide(point) {
        return Point(this.x / point.x, this.y / point.y)
    }
}
