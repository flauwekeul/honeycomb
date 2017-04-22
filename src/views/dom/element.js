export default function DOMElementFactory({ stringToDOMNodes }) {
    const prototype = {
        position(origin) {
            const position = origin.add(this.hex.toPoint())
            Object.assign(this.element.style, {
                left: `${position.x}px`,
                top: `${position.y}px`
            })
            return this
        },

        appendTo(element) {
            element.appendChild(this.element)
            return this
        }
    }

    return function DOMElement(hex, template) {
        return Object.assign(
            Object.create(prototype),
            {
                hex,
                element: stringToDOMNodes(template(hex))[0]
            }
        )
    }
}
