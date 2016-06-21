import { stringToDOMNodes } from '../../utils'
import Hex from '../../hex'

export default {
    // TODO: optimize
    render(hexes) {
        const hexNode = stringToDOMNodes(Hex.prototype.element())[0]

        Object.assign(hexNode.style, {
            position: 'absolute',
            width: Hex.prototype.width(),
            height: Hex.prototype.height()
        })

        hexes.forEach(hex => {
            Object.assign(hexNode.style, {
                left: hex.toPoint().x,
                top: hex.toPoint().y
            })
            this.container.appendChild(hexNode.cloneNode(true))
        })

        return this
    }
}
