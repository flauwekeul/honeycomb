import Point from '.'

export default {
    add(point) {
        return Point(this.x + point.x, this.y + point.y)
    },

    subtract(point) {
        return Point(this.x - point.x, this.y - point.y)
    },

    multiply(point) {
        return Point(this.x * point.x, this.y * point.y)
    },

    divide(point) {
        return Point(this.x / point.x, this.y / point.y)
    },

    invert() {
        return this.multiply(Point(-1))
    }
}
