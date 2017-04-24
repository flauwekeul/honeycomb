var Grid = Honeycomb.Grid,
    View = Honeycomb.View,
    SVGTemplate = Honeycomb.SVGTemplate,
    container = document.getElementById('container'),
    rect = container.getBoundingClientRect(),
    grid,
    template,
    view

grid = Grid({
    size: 50,
    orientation: Honeycomb.HEX_ORIENTATIONS.POINTY
})

template = SVGTemplate()

view = View({
    grid: grid,
    template: template,
    container: container,
    origin: {
        x: rect.width / 2,
        y: rect.height / 2
    }
})

view.renderGrid()
// view.renderHexes(grid.rectangle(4, 4))
