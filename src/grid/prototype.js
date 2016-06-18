import Hex from '../hex'

export default {
    // currently only supports svg
    render(options = {}) {
        const { container } = options

        if (/svg/i.test(options.view)) {
            // TODO: move this to a separate module
            const svg = stringToDOMNodes(options.hexElement)[0]

            Object.assign(svg.style, {
                position: 'absolute',
                width: Hex.prototype.width(),
                height: Hex.prototype.height()
            })

            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    const hex = Hex(x, y)

                    Object.assign(svg.style, {
                        left: hex.toPoint().x,
                        top: hex.toPoint().y
                    })

                    container.appendChild(svg.cloneNode(true))
                }
            }
        }
    }
}

const stringToDOMNodes = (string) => {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}
