import { ORIENTATIONS } from './constants'

/**
 * @method Hex#coordinates
 * @returns {Object} The hex's x, y and z coordinates.
 */
export function coordinates() {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    }
}

/**
 * @method Hex#isPointy
 * @returns {Boolean} Whether hexes have a pointy ⬢ orientation.
 */
export function isPointy() {
    return this.orientation === ORIENTATIONS.POINTY
}

/**
 * @method Hex#isFlat
 * @returns {Boolean} Whether hexes have a flat ⬣ orientation.
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
    return Math.sqrt(3) / 2 * this.oppositeCornerDistance()
}

/**
 * @method Hex#view
 *
 * @description
 * It returns the result of calling the template function with the current hex.
 *
 * @todo Add examples.
 *
 * @returns {String}    The view representation of the hex (usually a string).
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
            x = this.size * Math.sqrt(3) * (this.x + this.y / 2)
            y = this.size * 3/2 * this.y
        } else {
            x = this.size * 3/2 * this.x
            y = this.size * Math.sqrt(3) * (this.y + this.x / 2)
        }

        return Point(x, y).subtract(this.origin)
    }
}
