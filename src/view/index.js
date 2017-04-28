export default function ViewFactory({ Point, isDom } = {}) {
    /**
     * @function View
     *
     * @description
     * Factory function for creating views. A view instance can be used to render (a grid of) hexes.
     */
    return function View({
        grid,
        template,
        container,
        origin
    } = {}) {
        if (!isDom(container)) {
            throw new Error(`Container is not a valid dom node: ${container}.`)
        }

        return {
            grid,
            template,
            container,
            origin: Point(origin),
            hexes: [],

            /**
             * @method Views.DOM#renderGrid
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
            renderGrid() {
                const Hex = this.grid.Hex
                const rect = this.container.getBoundingClientRect()

                // increase the size of the hex rectangle to guarantee it covers the container
                const width = Math.round(rect.width / this.grid.colSize()) + 3
                const height = Math.round(rect.height / this.grid.rowSize()) + 3
                const start = Hex.subtract(this.grid.pointToHex(this.origin.invert()), Hex(1))

                return this.renderHexes(this.grid.rectangle(width, height, start))
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
                const fragment = hexes.reduce((fragment, hex) => {
                    fragment.appendChild(this.template(hex))
                    return fragment
                }, document.createDocumentFragment())

                this.hexes = hexes
                this.container.appendChild(fragment)

                return this
            }
        }
    }
}
