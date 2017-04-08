var Grid = Honeycomb.Grid,
    SVGView = Honeycomb.Views.SVG,
    container = document.getElementById('container'),
    grid,
    view

grid = Grid({
    size: 50,
    orientation: Honeycomb.HEX_ORIENTATIONS.POINTY,
    template: function(hex) {
        var coordinates = hex.coordinates(),
            x = coordinates.x,
            y = coordinates.y,
            z = coordinates.z
        return '\
            <svg>\
                <use xlink:href="#pointy-hex"/>\
                <text>\
                    <tspan x="10" y="40" text-anchor="start">x:' + x + '</tspan>\
                    <tspan x="80" y="40" text-anchor="end">y:' + y + '</tspan>\
                    <tspan x="45" y="85" text-anchor="middle">z:' + z + '</tspan>\
                </text>\
            </svg>'
        // return '\
        //     <svg>\
        //         <use xlink:href="#flat-hex"/>\
        //         <text>\
        //             <tspan x="15" y="45" text-anchor="start">x:' + x + '</tspan>\
        //             <tspan x="90" y="45" text-anchor="end">y:' + y + '</tspan>\
        //             <tspan x="50" y="75" text-anchor="middle">z:' + z + '</tspan>\
        //         </text>\
        //     </svg>'
    }
})

view = SVGView({
    container: container,
    origin: {
        x: container.offsetWidth / 2,
        y: container.offsetHeight / 2
    }
})
    .render(grid)
    // .renderHexes(grid.rectangle(4, 4))
