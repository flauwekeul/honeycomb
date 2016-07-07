# Honeycomb

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

## TODO

1. Maybe add instance methods for `Grid` and `Views.DOM` to get/set options. Then it's optional to pass the options to the `Grid` and `Views.DOM` factories and set those options later.
2. Visually test `Hex.hexesBetween()` in examples/grid.html.
3. Visually test with flat hexes.
3. `Grid` and `Views.DOM` don't need prototypes.
2. Filter overlapping hexes when multiple shapes are rendered.
5. Make it possible to render all different shapes, e.g. there are [4 possible triangle configurations](http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13). For this it's probably necessary to make a Hex accept **any** 2 of the 3 coordinates (just 1 is ambiguous) and automatically set the missing coordinate.
1. Add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped.
3. Remove tiny gaps between SVG's
4. Consider using [is.js](http://is.js.org).
