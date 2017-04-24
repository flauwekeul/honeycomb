export default function SVGTemplateFactory({ document }) {
    // TODO: template can be a string or an SVG node
    // TODO: do something with template
    return function SVGTemplate(template) {
        const prototype = {
            position(origin) {
                const position = origin.add(this.hex.toPoint())
                this.element.setAttribute('transform', `translate(${position.x},${position.y})`)
                return this
            },

            appendTo(container) {
                container.appendChild(this.element)
                return this
            }
        }

        return function compile(hex) {
            const NS = 'http://www.w3.org/2000/svg'
            const g = document.createElementNS(NS, 'g')
            const polygon = document.createElementNS(NS, 'polygon')
            const points = hex.corners().map(corner => `${corner.x},${corner.y}`).join(' ')

            polygon.setAttribute('points', points)
            g.appendChild(polygon)

            return Object.assign(
                Object.create(prototype),
                { hex, element: g }
            )
        }
    }
}
