var Grid = Honeycomb.Grid,
    View = Honeycomb.View,
    DOMCompiler = Honeycomb.DOMCompiler,
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
    render: DOMCompiler('<div class="hex"></div>'),
    container: container,
    origin: {
        x: rect.width / 2,
        y: rect.height / 2
    }
})

view.renderGrid()
// view.renderHexes(grid.rectangle(4, 4))
