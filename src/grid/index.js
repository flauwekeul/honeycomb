import { is } from '../utils'
import Point from '../point'
import * as methods from './methods'

export default function GridFactory({ HexFactory }) {
    /**
     * @function Grid
     *
     * @description
     * Factory function for creating a grid (singular). It currently only supports a single grid, because it sets size, orientation and origin for **all** hexes. Several "shape" methods are exposed that return an array of hexes in a certain shape.
     *
     * A grid is *viewless*, i.e.: it's an abstract grid with undefined dimensions. If you want to render a tangible grid, use a View factory (e.g. the {@link Views.DOM|DOM view}) by passing it a grid instance.
     *
     * @param {Object} options       An object containing a `hex` property
     * @param {Object} options.hex   An object that can contain a size, orientation and origin.
     * This will be refactored 😬
     *
     * @returns {Object} An object with helper methods like: translating 2-dimensional points to hex coordinates and generating arrays of hexes in a certain shape.
     *
     * @example
     * import { Grid, Point } from 'Honeycomb'
     *
     * Grid({
     *     hex: {
     *         size: 10,                // passed to Hex#size
     *         orientation: 'pointy',   // passed to Hex#orientation
     *         origin: Point(0, 0)      // passed to Hex#origin
     *     }
     * })
     */
    return function Grid(hexSettings) {
        // TODO: validate hexSettings
        const Hex = HexFactory(hexSettings)

        return {
            pointToHex:     methods.pointToHexFactory({ Point, Hex }),
            hexToPoint:     methods.hexToPoint,
            colSize:        methods.colSizeFactory({ Hex }),
            rowSize:        methods.rowSizeFactory({ Hex }),
            parallelogram:  methods.parallelogramFactory({ Hex, is }),
            triangle:       methods.triangleFactory({ Hex, is }),
            hexagon:        methods.hexagonFactory({ Hex, is }),
            rectangle:      methods.rectangleFactory({ Hex, is })
        }
    }
}
