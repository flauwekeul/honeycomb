import isDom from 'is-dom'
import Point from '../point'
import Hex from '../hex'

/**
 * @function Views.DOM
 *
 * @description
 * Factory function for creating a DOM view object. This object can be used to render an array of hexes it's passed or a grid instance. If a grid instance is passed, its {@link Grid#colSize|colSize} and {@link Grid#rowSize|rowSize} is used to calculate how many hexes are to be shown in a rectangular shape.
 *
 * @param {Object} options           An options object.
 * @param {Node} options.container   A DOM node to render hexes in.
 * @param {Object} options.hex       An options object containing a `hex` property with an `element` property that get's passed to {@link Hex#element}.
 * @param {Point} options.origin     A point where the first hex (i.e. `Hex(0, 0, 0)`) can be rendered.
 *
 * @returns {Object}            An object with helper methods like to render a view for a hex grid using the DOM.
 */
export default function DOM({ container, hex, origin = Point(0, 0) }) {
    if (!isDom(container)) {
        console.warn(`Container is not a valid dom node: ${container}.`)
        return false
    }

    Hex.element(hex.element)

    return {
        origin: Point(origin),
        container,
        hex,

        /**
         * @method Views.DOM#render
         *
         * @description
         * Renders the passed {@link Grid|grid} instance in the container. The container is completely covered with hexes.
         *
         * @param   {Object} grid   A grid instance (from the {@link Grid} factory).
         *
         * @returns {Object}        The DOM View object, for chaining.
         */
        render(grid) {
            // increase the size of the hex rectangle to guarantee it covers the container
            const width = Math.round(this.container.offsetWidth / grid.colSize()) + 3
            const height = Math.round(this.container.offsetHeight / grid.rowSize()) + 3
            const start = grid.pointToHex(this.origin.invert()).subtract(Hex(1))

            return this.renderHexes(grid.rectangle(width, height, start))
        },

        /**
         * @method Views.DOM#renderHexes
         *
         * @description
         * Renders the passed hexes in the container.
         *
         * @param   {Hex[]} hexes   An array of hexes to render.
         *
         * @returns {Object}        The DOM View object, for chaining.
         */
        renderHexes(hexes) {
            const style = {
                position: 'absolute',
                width: `${Hex.width()}px`,
                height: `${Hex.height()}px`
            }

            const hexNodes = hexes.reduce((fragment, hex) => {
                const hexNode = stringToDOMNodes(hex.element())[0]
                const hexOffset = this.origin.add(hex.toPoint())

                Object.assign(hexNode.style, style, {
                    left: `${hexOffset.x}px`,
                    top: `${hexOffset.y}px`
                })

                fragment.appendChild(hexNode)
                return fragment
            }, document.createDocumentFragment())

            this.container.appendChild(hexNodes)
            return this
        }
    }
}

// privates

function stringToDOMNodes(string) {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}
