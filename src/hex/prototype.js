import { is } from '../utils'

import { ORIENTATIONS } from './constants'
import Hex from '.'
import Point from '../point'

export default ({
    coordinates,
    isPointy,
    isFlat,
    oppositeCornerDistance,
    oppositeSideDistance,
    view,
    width,
    height,
    center: centerFactory({ Point }),
    toPoint: toPointFactory({ Point }),
    fromPoint: fromPointFactory({ Point, Hex })
})

export function coordinates() {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    }
}

/**
 * @method Hex#isPointy
 * @returns {Boolean} Whether hexes have a pointy orientation.
 */
export function isPointy() {
    return this.orientation === ORIENTATIONS.POINTY
}

/**
 * @method Hex#isFlat
 * @returns {Boolean} Whether hexes have a flat orientation.
 */
export function isFlat() {
    return this.orientation === ORIENTATIONS.FLAT
}

/**
 * @method Hex#oppositeCornerDistance
 * @returns {Number}    The distance between opposite corners of a hex.
 */
export function oppositeCornerDistance() {
    return this.size * 2
}

/**
 * @method Hex#oppositeSideDistance
 * @returns {Number}    The distance between opposite sides of a hex.
 */
export function oppositeSideDistance() {
    return Math.sqrt(3) / 4 * this.size
}

/**
 * @method Hex#view
 *
 * @description
 * It returns the result of calling the template function with the current hex.
 *
 * @todo Add examples.
 *
 * @returns {String}    The view representation of the hex.
 */
export function view() {
    return this.template(this)
}

/**
 * @method Hex#width
 * @returns {Number}    The (horizontal) width of any hex.
 */
export function width() {
    return this.isPointy() ?
        this.oppositeSideDistance() :
        this.oppositeCornerDistance()
}

/**
 * @method Hex#height
 * @returns {Number}    The (vertical) height of any hex.
 */
export function height() {
    return this.isPointy() ?
        this.oppositeCornerDistance() :
        this.oppositeSideDistance()
}

export function centerFactory({ Point }) {
    /**
     * @method Hex#center
     * @returns {Point} The relative center of any hex.
     */
    return function center() {
        return Point(this.width() / 2, this.height() / 2)
    }
}

export function toPointFactory({ Point }) {
    /**
     * @method Hex#toPoint
     *
     * @description
     * Converts the current hex to an (absolute) 2-dimensional {@link Point|point}. Uses the hex's origin.
     *
     * @returns {Point} The 2D point the hex corresponds to.
     */
    return function toPoint() {
        let x, y

        if (this.isPointy()) {
            x = this.size() * Math.sqrt(3) * (this.x + this.y / 2)
            y = this.size() * 3/2 * this.y
        } else {
            x = this.size() * 3/2 * this.x
            y = this.size() * Math.sqrt(3) * (this.y + this.x / 2)
        }

        return Point(x, y).subtract(this.origin())
    }
}

export function fromPointFactory({ Point, Hex }) {
    /**
     * @method Hex#fromPoint
     *
     * @description
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param   {Point} point   The point to convert from.
     *
     * @returns {Hex}           The hex (with rounded coordinates) the passed 2D point corresponds to.
     */
    return function fromPoint(point) {
        const size = this.size()
        let x, y

        // guarantee point is an actual Point instance
        point = Point(point)

        if (this.isPointy()) {
            x = (point.x * Math.sqrt(3)/3 - point.y / 3) / size
            y = point.y * 2/3 / size
        } else {
            x = point.x * 2/3 / size
            y = (-point.x / 3 + Math.sqrt(3)/3 * point.y) / size
        }

        return Hex.round(Hex(x, y))
    }
}
