import { ORIENTATIONS } from './constants'

export default {
    // `0` is returned if `-firstDimension - secondDimension` result in `-0`
    thirdDimension(firstDimension, secondDimension) {
        return -firstDimension - secondDimension || 0
    },

    pointy() {
        this.orientation = ORIENTATIONS.POINTY
    },

    flat() {
        this.orientation = ORIENTATIONS.FLAT
    }
}
