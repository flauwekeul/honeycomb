var Grid = Honeycomb.Grid,
    View = Honeycomb.View,
    DOMTemplate = Honeycomb.DOMTemplate,
    container = document.getElementById('container'),
    grid,
    template,
    view

grid = Grid({
    size: 50,
    orientation: Honeycomb.HEX_ORIENTATIONS.POINTY
})

template = DOMTemplate('<div class="hex"></div>')

view = View({
    grid: grid,
    template: template,
    container: container,
    origin: {
        x: container.offsetWidth / 2,
        y: container.offsetHeight / 2
    }
})

view.renderGrid()
// view.renderHexes(grid.rectangle(4, 4))
