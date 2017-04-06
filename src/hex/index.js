import { is, unsignNegativeZero } from '../utils'
import { ORIENTATIONS } from './constants'
import Point from '../point'
import * as statics from './statics'
import * as methods from './prototype'

/**
 * @function HexFactory
 *
 * @description
 * Factory that produces a {@link Hex} function to create hexes with. It accepts optional hex settings that are used to create a "family" of hexes that can be used in a grid (or individually). This "family" of hexes all share the same `prototype`.
 *
 * @todo validate orientation, size, origin and template
 *
 * @param {(FLAT|POINTY)} [$0.orientation=FLAT] All hexes are either POINTY ⬢ or FLAT ⬣.
 * @param {Number} [$0.size=1]                  Size of all hexes.
 * @param {Point} [$0.origin=Point()]           Used to convert the hex position to a point. Defaults to the top left.
 * @param {Function} [$0.template]              Template function that should return a (visual) representation of the hex. It gets passed the current hex when called. Could be an HTML string (e.g. `'<div class="hex"></div>'`) that can be parsed by a {@link Views.DOM} instance. A {@link Views|View} uses the hex's {@link Hex#view} method to call the template function and produce a view.
 *
 * @returns {Hex} A function to produce hexes, all with the same `prototype`.
 */
export default function HexFactory({
    orientation = ORIENTATIONS.FLAT,
    size = 1,
    origin = Point(),
    template = hex => hex,
} = {}) {
    const prototype = {
        // settings:
        orientation,
        size,
        origin,
        template,

        // methods:
        coordinates:            methods.coordinates,
        isPointy:               methods.isPointy,
        isFlat:                 methods.isFlat,
        oppositeCornerDistance: methods.oppositeCornerDistance,
        oppositeSideDistance:   methods.oppositeSideDistance,
        view:                   methods.view,
        width:                  methods.width,
        height:                 methods.height,
        center:                 methods.centerFactory({ Point }),
        toPoint:                methods.toPointFactory({ Point })
    }

    /**
     * @function Hex
     *
     * @description
     * Factory function for creating hexes.
     *
     * Coordinates not passed to the factory are inferred using the other coordinates:
     * * When two coordinates are passed, the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
     * * When one coordinate is passed, the second coordinate is set to the first and the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
     * * When nothing or a falsy value is passed, all coordinates are set to `0`.
     *
     * @see {@link redblobgames.com|http://www.redblobgames.com/grids/hexagons/#coordinates}
     *
     * @param {(Number|Object)} [coordinates=0] The x coordinate or an object containing any of the x, y and z coordinates.
     * @param {Number} [coordinates.x=0] The x coordinate.
     * @param {Number} [coordinates.y=0] The y coordinate.
     * @param {Number} [coordinates.z=0] The z coordinate.
     * @param {Number} [y=0] The y coordinate.
     * @param {Number} [z=0] The z coordinate.
     *
     * @returns {Hex} A hex object. It always contains all three coordinates (`x`, `y` and `z`).
     *
     * @example
     * Hex()            // returns hex( x: 0, y: 0, z: 0 )
     * Hex(1)           // returns hex( x: 1, y: 1, z: -2 )
     * Hex(1, 2)        // returns hex( x: 1, y: 2, z: -3 )
     * Hex(1, 2, -3)    // returns hex( x: 1, y: 2, z: -3 )
     * Hex(1, 2, 5)     // coordinates don't sum up to 0; throws an error
     *
     * Hex({ x: 3 })    // returns hex( x: 3, y: 3, z: -3 )
     * Hex({ y: 3 })    // returns hex( x: 3, y: 3, z: -6 )
     * Hex({ z: 3 })    // returns hex( x: 3, y: -6, z: 3 )
     */
    function Hex(...coordinates) {
        // if an object is passed, extract coordinates and call self
        if (is.objectLiteral(coordinates[0])) {
            let { x, y, z } = coordinates[0]
            return Hex(x, y, z)
        }

        let [ x, y, z ] = coordinates.map(unsignNegativeZero)

        switch (coordinates.filter(is.number).length) {
            case 3:
                break
            case 2:
                x = is.number(x) ? x : Hex.thirdCoordinate(y, z)
                y = is.number(y) ? y : Hex.thirdCoordinate(x, z)
                z = is.number(z) ? z : Hex.thirdCoordinate(x, y)
                break
            case 1:
                if (is.number(x)) {
                    y = x
                    z = Hex.thirdCoordinate(x, y)
                } else if (is.number(y)) {
                    x = y
                    z = Hex.thirdCoordinate(x, y)
                } else {
                    x = z
                    y = Hex.thirdCoordinate(x, z)
                }
                break
            default:
                x = y = z = 0
        }

        if (Math.round(x + y + z) !== 0) {
            throw new Error(`Coordinates don\'t sum to 0: { x: ${x}, y: ${y}, z: ${z} }.`)
        }

        // return an object containing the coordinates that's prototype-linked to the prototype created in HexFactory
        return Object.assign(
            Object.create(prototype),
            { x, y, z }
        )
    }

    Object.assign(Hex, {
        thirdCoordinate: statics.thirdCoordinateFactory({ unsignNegativeZero }),
        isValidSize: statics.isValidSize,
        hexesBetween: statics.hexesBetweenFactory({ Hex }),
        add: statics.addFactory({ Hex }),
        subtract: statics.subtractFactory({ Hex }),
        neighbor: statics.neighborFactory({ Hex }),
        distance: statics.distanceFactory({ Hex }),
        round: statics.roundFactory({ Hex }),
        lerp: statics.lerpFactory({ Hex }),
        nudge: statics.nudgeFactory({ Hex })
    })

    return Hex
}
