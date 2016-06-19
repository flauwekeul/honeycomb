export default {
    // TODO: optimize
    draw(hexes) {
        Object.assign(this.hexNode.style, {
            position: 'absolute',
            // TODO: hex width and hex height should be available on `this`?
            width: hexes[0].width(),
            height: hexes[0].height()
        })

        hexes.forEach(hex => {
            Object.assign(this.hexNode.style, {
                left: hex.toPoint().x,
                top: hex.toPoint().y
            })
            this.container.appendChild(this.hexNode.cloneNode(true))
        })

        return this
    }
}
