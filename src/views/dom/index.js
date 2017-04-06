export default function DOMFactory({ Point, isDom } = {}) {
    /**
     * @function Views.DOM
     *
     * @description
     * Factory function for creating a DOM view object. This object can be used to render an array of hexes or a grid instance.
     *
     * @param {Object} options                  An options object.
     * @param {Node} options.container          A DOM node to render hexes in.
     * @param {Point} [options.origin=Point()]  A point where the first hex (i.e. `Hex(0, 0, 0)`) can be rendered.
     *
     * @returns {Object}                        A DOM View instance.
     */
    return function DOM({ container, origin } = {}) {
        if (!isDom(container)) {
            throw new Error(`Container is not a valid dom node: ${container}.`)
        }

        return {
            container,
            origin: Point(origin),

            /**
             * @method Views.DOM#render
             *
             * @description
             * Renders the passed {@link Grid|grid} instance in the container. The container is completely covered with hexes.
             *
             * @todo validate `grid`
             *
             * @param   {Object} grid   A grid instance.
             *
             * @returns {Object}        The DOM View object, for chaining.
             */
            render(grid) {
                const Hex = grid.Hex
                // increase the size of the hex rectangle to guarantee it covers the container
                const width = Math.round(this.container.offsetWidth / grid.colSize()) + 3
                const height = Math.round(this.container.offsetHeight / grid.rowSize()) + 3
                const start = Hex.subtract(grid.pointToHex(this.origin.invert()), Hex(1))

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
                const hexNodes = hexes.reduce((fragment, hex) => {
                    const hexNode = stringToDOMNodes(hex.view())[0]
                    const hexOffset = this.origin.add(hex.toPoint())

                    Object.assign(hexNode.style, {
                        position: 'absolute',
                        width: `${hex.width()}px`,
                        height: `${hex.height()}px`,
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
}

// privates

function stringToDOMNodes(string) {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}
