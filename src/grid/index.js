import { is } from '../utils'
import Point from '../point'
import * as methods from './methods'

export default function GridFactory({ HexFactory } = {}) {
    /**
     * @module src/grid
     * @function Grid
     *
     * @description
     * Factory function for creating grids. It accepts optional hex settings that are passed directly to {@link HexFactory}. Several "shape" methods are exposed that return an array of hexes in a certain shape.
     *
     * A grid is *viewless*, i.e.: it's an abstract grid with undefined dimensions. If you want to render a tangible grid, use a View factory (e.g. the {@link Views.DOM|DOM view}).
     *
     * @param {Object} [hexSettings]    Optional settings that apply to *all* hexes in the grid. See {@link Hexfactory} for possible properties.
     *
     * @returns {Object} An object with methods.
     *
     * @example
     * import { Grid, HEX_ORIENTATIONS } from 'Honeycomb'
     *
     * const grid = Grid({
     *     size: 50,
     *     orientation: HEX_ORIENTATIONS.POINTY
     * })
     *
     * grid.triangle(3)
     */
    return function Grid(hexSettings) {
        // TODO: validate hexSettings
        const Hex = HexFactory(hexSettings)

        return {
            Hex,
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
