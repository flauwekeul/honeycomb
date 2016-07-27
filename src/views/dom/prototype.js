import Hex from '../../hex'

export default {
    renderHexes(hexes) {
        const style = {
            position: 'absolute',
            width: `${Hex.prototype.width()}px`,
            height: `${Hex.prototype.height()}px`
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
    },

    render(grid) {
        // increase the size of the hex rectangle to guarantee it covers the container
        const width = Math.round(this.container.offsetWidth / grid.colSize()) + 3
        const height = Math.round(this.container.offsetHeight / grid.rowSize()) + 3
        const start = grid.pointToHex(this.origin.invert()).subtract(Hex(1))

        return this.renderHexes(grid.rectangle(width, height, start))
    }
}

// privates

function stringToDOMNodes(string) {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}
