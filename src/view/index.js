// Methods aren't imported from a separate file, because it makes things too complicated.

export default function ViewFactory({ Point, isDom } = {}) {
    /**
     * @function View
     *
     * @description
     * Factory function for creating views. A view instance can be used to render (a grid of) hexes. This function expects _raw_ DOM elements, i.e. it lacks helpers to convert strings to DOM elements. You can use other libraries (e.g. [jQuery](https://jquery.com/), [svg.js](http://svgjs.com/)) to help create these DOM elements.
     *
     * @param {Object} [options={}]                 Options to instantiate the view with.
     * @param {Grid} options.grid                   A grid instance.
     * @param {Function} options.template           Template function that should return a DOM element. When hexes are rendered (e.g. by calling {@link View#renderGrid} or {@link View#renderHexes}), the template function is passed each hex. In the template function `this` refers to the view instance, so any view method can be called.
     * @param {Node} options.container              The container in which hexes are to be rendered. Should be an existing DOM element (e.g. a `<div>` or `<svg>`) in the `document`.
     * @param {Point} [options.origin=Point(0,0)]   Pixel origin where the start hex (`Hex(0, 0, 0)`) is placed. Defaults to `Point(0, 0)`, i.e.: the top left corner of the container. The origin is relative to the container (not to the `document`).
     *
     * @returns {View}                              A view instance to render hexes in.
     */
    return function View({
        grid,
        template,
        container,
        origin = 0
    } = {}) {
        if (!isDom(container)) {
            throw new Error(`Container is not a valid DOM element: ${container}.`)
        }

        const containerRect = container.getBoundingClientRect()

        return {
            grid,
            template,
            container,
            origin: Point(origin),
            hexes: [],

            /**
             * @method View#renderGrid
             *
             * @description
             * Renders all hexes that fit in the container, plus the optional padding. This padding defaults to 3 (hexes), so that the container is completely covered in hexes.
             *
             * @todo validate `grid`
             *
             * @param {number} [padding=3]  Number of hexes to add to all 4 sides of the container. Can be used to guarantee the container is completely covered in hexes.
             *
             * @returns {View}              The view instance, for chaining.
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
             * @method View#renderHexes
             *
             * @description
             * Renders the passed hexes in the container.
             *
             * @param   {Hex[]} hexes   An array of hexes to render. {@link Grid}'s shape methods can be used to generate this array.
             *
             * @returns {View}          The view instance, for chaining.
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

            /**
             * @method View#hexToPixel
             *
             * @description
             * Converts the passed hex to a pixel position relative to the container.
             *
             * @param  {Hex} hex    The hex to convert to a pixel position.
             * @returns {Point}     The pixel position.
             */
            hexToPixel(hex) {
                // Grid#hexToPoint returns the hex's origin relative to the start Hex (Hex(0))
                return this.grid.hexToPoint(hex)
                    // translate the hex's center-originating point to a top-left-originating point
                    .add(hex.topLeft())
                    // add the view's origin
                    .add(this.origin)
            },

            /**
             * @method View#pixelToHex
             *
             * @description
             * Converts the passed pixel position (relative to the container) to the corresponding hex.
             *
             * @param  {Point} pixel    The pixel position to convert to a hex.
             * @returns {Hex}            The corresponding (rounded) hex.
             */
            pixelToHex(pixel) {
                return this.grid.pointToHex(Point(pixel).subtract(this.origin))
            },

            /**
             * @method View#width
             *
             * @returns {number} The rounded amount of hexes that fit in the container horizontally ↔.
             */
            width() {
                return Math.round(containerRect.width / this.grid.colSize())
            },

            /**
             * @method View#height
             *
             * @returns {number} The rounded amount of hexes that fit in the container vertically ↕.
             */
            height() {
                return Math.round(containerRect.height / this.grid.rowSize())
            }
        }
    }
}
