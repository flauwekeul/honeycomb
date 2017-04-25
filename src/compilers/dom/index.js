export default function DOMCompilerFactory({ stringToDOMNodes }) {
    // TODO: template can be a string or a DOM node, maybe also an object?
    // e.g.: { tagName: 'div', cssClass: '', style: {}, *: * } ?
    return function DOMCompiler(template) {
        const prototype = {
            position(origin) {
                const position = origin.add(this.hex.toPoint())
                Object.assign(this.element.style, {
                    left: `${position.x}px`,
                    top: `${position.y}px`
                })
                return this
            },

            appendTo(container) {
                container.appendChild(this.element)
                return this
            }
        }

        return function render(hex) {
            const element = stringToDOMNodes(template)[0]
            return Object.assign(
                Object.create(prototype),
                { hex, element }
            )
        }
    }
}
