import Point from '.'

export default {
    add(point) {
        return Point(this.x + point.x, this.y + point.y)
    },

    subtract(point) {
        return Point(this.x - point.x, this.y - point.y)
    }
}
