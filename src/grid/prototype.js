import { stringToDOMNodes } from '../utils'
import Hex from '../hex'

export default {
    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline12
    parallelogram(width, height) {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.hexes.push(Hex(x, y))
            }
        }

        return this
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13
    triangle(side) {
        for (let x = 0; x < side; x++) {
            for (let y = 0; y < side - x; y++) {
                this.hexes.push(Hex(x, y))
            }
        }

        return this
    },

    hexagon(side) {
        for (let x = -side; x < side; x++) {
            const yStart = Math.max(-side, -x - side)
            const yEnd = Math.min(side, -x + side)
            for (let y = yStart; y < yEnd; y++) {
                this.hexes.push(Hex(x, y))
            }
        }

        return this
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline15
    rectangle(width, height) {
        for (let y = 0; y < height; y++) {
            const yOffset = Math.floor(y / 2)
            for (let x = -yOffset; x < width - yOffset; x++) {
                this.hexes.push(Hex(x, y))
            }
        }

        return this
    },

    DOMRender({ container, hex }) {
        // TODO: move this to a separate module
        const node = stringToDOMNodes(hex.element)[0]

        Object.assign(node.style, {
            position: 'absolute',
            width: Hex.prototype.width(),
            height: Hex.prototype.height()
        })

        this.hexes.forEach(hex => {
            Object.assign(node.style, {
                left: hex.toPoint().x,
                top: hex.toPoint().y
            })
            container.appendChild(node.cloneNode(true))
        })

        return this
    }
}
