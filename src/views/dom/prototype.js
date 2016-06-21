import { stringToDOMNodes } from '../../utils'
import Hex from '../../hex'

export default {
    render(hexes) {
        const style = {
            position: 'absolute',
            width: Hex.prototype.width(),
            height: Hex.prototype.height()
        }
        const fragment = document.createDocumentFragment()

        hexes.forEach(hex => {
            const hexNode = stringToDOMNodes(hex.element())[0]

            Object.assign(hexNode.style, style, {
                left: hex.toPoint().x,
                top: hex.toPoint().y
            })

            fragment.appendChild(hexNode)
        })

        this.container.appendChild(fragment)
        return this
    }
}
