import Point from '.'

export default ({
    /**
     * @method Point#add
     * @param {Point} point The point to add to the current point.
     *
     * @returns {Point}     The sum of the passed point's coordinates to the current point's.
     */
    add(point) {
        return Point(this.x + point.x, this.y + point.y)
    },

    /**
     * @method Point#subtract
     * @param   {Point} point   The point to subtract from the current point.
     *
     * @returns {Point}         The difference between the passed point's coordinates and the current point's.
     */
    subtract(point) {
        return Point(this.x - point.x, this.y - point.y)
    },

    /**
     * @method Point#multiply
     * @param   {Point} point   The point to multiply with the current point.
     *
     * @returns {Point}         The multiplication of the passed point's coordinates and the current point's.
     */
    multiply(point) {
        return Point(this.x * point.x, this.y * point.y)
    },

    /**
     * @method Point#divide
     * @param   {Point} point   The point where the current point is divided by.
     *
     * @returns {Point}         The division of the current point's coordinates and the passed point's.
     */
    divide(point) {
        return Point(this.x / point.x, this.y / point.y)
    },

    /**
     * @method Point#invert
     * @returns {Point} The inversion of the current point.
     */
    invert() {
        return this.multiply(Point(-1))
    }
})
