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
            position = this.origin.add(hex.toPoint()),
            g = document.createElementNS(NS, 'g'),
            polygon = document.createElementNS(NS, 'polygon'),
            points = hex.corners().map(corner => corner.x + ',' + corner.y).join(' ')

        polygon.setAttribute('points', points)
        g.appendChild(polygon)
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
