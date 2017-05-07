// Methods aren't imported from a separate file, because it makes things too complicated.

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

        const containerRect = container.getBoundingClientRect()

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
            renderGrid(padding = 3) {
                const Hex = this.grid.Hex

                const width = this.width() + padding
                const height = this.height() + padding
                const start = Hex.subtract(this.pixelToHex(0), Hex(Math.floor(padding / 2)))

                this.renderHexes(this.grid.rectangle(width, height, start))
                return this
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

                this.container.appendChild(fragment)
                this.hexes = hexes

                return this
            },

            hexToPixel(hex) {
                return this.grid.hexToPoint(hex).add(this.origin)
            },

            pixelToHex(pixel) {
                return this.grid.pointToHex(Point(pixel).subtract(this.origin))
            },

            // in hexes
            width() {
                return Math.round(containerRect.width / this.grid.colSize())
            },

            // in hexes
            height() {
                return Math.round(containerRect.height / this.grid.rowSize())
            }
        }
    }
}
