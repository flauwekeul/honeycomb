# Honeycomb

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

## TODO

1. Add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped.
2. Determine what to do when multiple shapes are called on a grid instance. E.g.: `grid().rectangle().triangle()`. Currently shapes are just added with potentially overlapping hexes.
3. Remove tiny gaps between SVG's
4. Expand initialization of a Grid so it's possible to pass a shape and render method. This way it would be possible to render a grid by just calling `Honeycomb.Grid({ options })`.
5. Add an option to create hexes within a certain area and have the hexes `cover`/`contain` that area. `cover` meaning hexes may spill over the area boundaries so that the whole area is covered with hexes. `contain` meaning no hexes will spill over the area boundaries so that all hexes are contained within the area.
6. Change `q`, `r` and `s` coordinates back to `x`, `y` and `z` respectively. For this all `r` and `s` coordinates need to be swapped first.
