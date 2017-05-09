'use strict'

var Grid = Honeycomb.Grid,
    View = Honeycomb.View,
    container = document.getElementById('container'),
    rect = container.getBoundingClientRect(),
    grid,
    view

grid = Grid({
    size: 50,
    orientation: Honeycomb.HEX_ORIENTATIONS.POINTY
})

view = View({
    grid: grid,
    template: function createTemplate(hex) {
        var NS = 'http://www.w3.org/2000/svg',
            position = this.hexToPixel(hex),
            hexCenter = hex.center(),
            g = document.createElementNS(NS, 'g'),
            polygon = document.createElementNS(NS, 'polygon'),
            text = document.createElementNS(NS, 'text'),
            textValue = document.createTextNode(`${hex.x}, ${hex.y}, ${hex.z}`),
            points = hex.corners().map(corner => corner.x + ',' + corner.y).join(' ')

        polygon.setAttribute('points', points)

        text.setAttribute('x', hexCenter.x)
        text.setAttribute('y', hexCenter.y)
        text.appendChild(textValue)

        g.appendChild(polygon)
        g.appendChild(text)
        g.setAttribute('transform', 'translate(' + position.x + ',' + position.y + ')')

        return g
    },
    container: container,
    origin: {
        x: rect.width / 2,
        y: rect.height / 2
    }
})

view.renderGrid()
// view.renderHexes(grid.rectangle(4, 4))

// Honeycomb.View will have helpers for handling events in the future
container.addEventListener('click', function handleClick(e) {
    // e.offsetX/Y isn't supported by firefox, so calculating it here:
    var rect = container.getBoundingClientRect(),
        offsetX = e.clientX - rect.left,
        offsetY = e.clientY - rect.top,
        hex = view.pixelToHex([offsetX, offsetY])

    console.log(`offset: ${[offsetX, offsetY]}, hex: ${[hex.x, hex.y, hex.z]}`)
})
