var Grid = Honeycomb.Grid,
    DOMView = Honeycomb.Views.DOM,
    container = document.getElementById('container'),
    grid,
    view

grid = Grid({
    size: 50,
    orientation: Honeycomb.HEX_ORIENTATIONS.POINTY
})

view = DOMView({
    grid,
    container: container,
    origin: {
        x: container.offsetWidth / 2,
        y: container.offsetHeight / 2
    },
    template: function(hex) {
        var coordinates = hex.coordinates(),
            x = coordinates.x,
            y = coordinates.y,
            z = coordinates.z
        return `<div class="hex"></div>`
    }
})

view.renderGrid()
// view.renderHexes(grid.rectangle(4, 4))
