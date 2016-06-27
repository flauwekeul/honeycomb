# Honeycomb

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

## TODO

4. Add an option to create hexes within a certain area and have the hexes `cover`/`contain` that area. `cover` meaning hexes may spill over the area boundaries so that the whole area is covered with hexes. `contain` meaning no hexes will spill over the area boundaries so that all hexes are contained within the area.
1. Add `Grid.prototype.pointToHex()` or something.
2. Test `Hex.hexesBetween()` in examples/grid.html.
3. `Grid` and `Views.DOM` maybe don't need prototypes. They're essentially singletons.
2. Filter overlapping hexes when multiple shapes are rendered.
5. Make it possible to render all different shapes, e.g. there are [4 possible triangle configurations](http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13). For this it's probably necessary to make a Hex accept **any** 2 of the 3 coordinates (just 1 is ambiguous) and automatically set the missing coordinate.
1. Add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped.
3. Remove tiny gaps between SVG's
4. Consider using [is.js](http://is.js.org).
