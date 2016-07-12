# Honeycomb

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

## Backlog

### Bugs
5. Shape directions only make sense for pointy hexes. Flat hexes are rotated clockwise, rotating their directions clockwise as well. Might be fixes by refactoring #1?
3. Remove tiny gaps between SVG's (at least when size is 50)

### Features
4. Make the 'shape' methods of `Grid` (also) accept an options object.
1. Maybe add instance methods for `Grid` and `Views.DOM` to get/set options. Then it's optional to pass the options to the `Grid` and `Views.DOM` factories and set those options later.
2. Filter overlapping hexes when multiple shapes are rendered.
1. Add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped.

### Refactorings
4. Maybe create a 'base hex' and a 'pointy hex' and 'flat hex'. A lot of calculations differ based on the hex orientation.
3. `Grid` and `Views.DOM` don't need prototypes.
4. Consider using [is.js](http://is.js.org).
