# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.8](https://github.com/flauwekeul/honeycomb/compare/v3.1.7...v3.1.8) (2021-03-19)

## [4.0.0-alpha.0](https://github.com/flauwekeul/honeycomb/compare/v3.1.7...v4.0.0-alpha.0) (2021-03-19)


### Features

* **grid:** a grid can now be created with an optional traverser ([dd39683](https://github.com/flauwekeul/honeycomb/commit/dd3968366fca1f2bcd2f3e4fc59198a8e9eda063))
* **grid:** add HexCache class and use it as a start to cache hexes in grid ([a20371a](https://github.com/flauwekeul/honeycomb/commit/a20371a22744c1dcc93681c27dea0b001c1ba123))
* **grid:** add setStore helper function and add set method to GridStore interface ([b182928](https://github.com/flauwekeul/honeycomb/commit/b182928b5f5ad7b88d5d7b2beff85a7ecfdbcf59))
* **grid:** grids can now be created/traversed with a single traverser or an array of traversers ([f87b362](https://github.com/flauwekeul/honeycomb/commit/f87b362dac91bd872aa56a8edbd049cf854de213))
* set [Symbol.toStringTag] on Grid and hex prototype ([086e9ef](https://github.com/flauwekeul/honeycomb/commit/086e9ef66043c0622d6408fea2dca6428278fa42))
* **grid:** add GridStore type and make sure the toString() Hex method is called to create an id ([970ef91](https://github.com/flauwekeul/honeycomb/commit/970ef9183458697b207ee8befee3a3b898745322))
* **grid:** add NoOpCache and use it as the default cache in Grid ([ed0ae20](https://github.com/flauwekeul/honeycomb/commit/ed0ae2069a44a264b74e413a407ab2ad0bfa5991))
* **grid:** add optional argument to move() traverser to move in the same direction multiple times ([a0a0cef](https://github.com/flauwekeul/honeycomb/commit/a0a0cefc7b65511160bf5888ea6890fb4101fad5))
* **grid:** call copy() on the initial cursor hex in Grid.traverse() ([c5fdfd0](https://github.com/flauwekeul/honeycomb/commit/c5fdfd0bbda648be23abdea00db9513b4024d05e))
* **grid:** improve types and name some anonymous functions for better debugging ([149349d](https://github.com/flauwekeul/honeycomb/commit/149349d9f09599ca0529e7cc265fe753a24b33d2))
* **grid:** improve typing of Grid methods and traverse commands ([7674754](https://github.com/flauwekeul/honeycomb/commit/7674754d6fbcfe3fed97fb2f0dbdfce671c828b7))
* **grid:** make CompassDirection a union type ([9ff10b8](https://github.com/flauwekeul/honeycomb/commit/9ff10b80db6fe6b4a617240b79769f338c2c5037))
* **grid:** more or less settled on Grid API ([07da528](https://github.com/flauwekeul/honeycomb/commit/07da5289655a57e9996fc5b5555ac09513a9a58f))
* **grid:** move traversers to traversers folder and add utils folder with forEach and map ([b03c899](https://github.com/flauwekeul/honeycomb/commit/b03c8991e50898d9bd3222f0e7f21cb5cab6c028))
* **grid:** pass cursor along with hexes in getPrevHexState() for a ~20% performance increase ([6028c36](https://github.com/flauwekeul/honeycomb/commit/6028c36af3ee4ef8ed29f048d142492802944ed3))
* **grid:** pass getHex() function to all traversers, this way they can use the cache ([0678b77](https://github.com/flauwekeul/honeycomb/commit/0678b77c80581ac3894c8e8d83dc7603c948e2b7))
* **grid:** rectangle() traverser and grid method now accept opposing corners as arguments ([9c2834b](https://github.com/flauwekeul/honeycomb/commit/9c2834bab2ee519b404ca4ac7b9ff69195903c14))
* **grid:** remove map method, add filter and takeWhile methods and add inStore helper function ([4c7640a](https://github.com/flauwekeul/honeycomb/commit/4c7640ab7b4b5aa5897edc2ff948f3e36ff1ac5f))
* **grid:** rename HexCache to CoordinatesCache and expand API, add toString() to hex ([b0adfca](https://github.com/flauwekeul/honeycomb/commit/b0adfcadc6b0b3c1442b37e24ef92407b9cdfd42))
* **grid:** restrict Grid.traverse() to the hexes in the grid (from the previous iteration, if any) ([5837a30](https://github.com/flauwekeul/honeycomb/commit/5837a305b6ebb1a86c6c0b28ba13fd0fdefb1fcd))
* **grid:** rewrite the rectangle traverser and update Grid.rectangle() to use it, add Compass class ([f3b6bb3](https://github.com/flauwekeul/honeycomb/commit/f3b6bb38ccd9eaf4e07a3340caf28d8bc6c8c927))
* **grid:** subsequent traverse() calls now stop when attempting to traverse outside the grid ([cef16ea](https://github.com/flauwekeul/honeycomb/commit/cef16eab62f5115994a06b8a1a7d723849b69385))
* **grid:** traverse functions don't create hexes anymore ([8d838a8](https://github.com/flauwekeul/honeycomb/commit/8d838a871a7e9e15016724571cf8a155617f185b))
* **grid:** update grid rectangle method to only within previous grid ([3d8cd05](https://github.com/flauwekeul/honeycomb/commit/3d8cd055390d7a27040e0bf7d288c5f32441f076))
* **grid:** use single Compass enum, make move() accept ambiguous directions, improve grid.rectangle ([30d7738](https://github.com/flauwekeul/honeycomb/commit/30d7738711963fd284aa74a1131a3e32fae371b8))
* **hex:** add corners(), width() and height() functions ([c2b8fc7](https://github.com/flauwekeul/honeycomb/commit/c2b8fc706006af71ec27b4d48411e822727f3db9))
* **hex:** add equals() method to hex prototype ([0f7dc9f](https://github.com/flauwekeul/honeycomb/commit/0f7dc9f9234a8921d2868ede723b978be85bed9e))
* **hex:** add functions to convert hexes to points ([528c9e0](https://github.com/flauwekeul/honeycomb/commit/528c9e073d8802b05b2b606678e4516077596c91))
* **hex:** add isHex() function and overload corners() to either accept a hex or hex settings ([dd748a3](https://github.com/flauwekeul/honeycomb/commit/dd748a351bc8958d53239cc9fe2bcd9e4d651075))
* **hex:** createHex() now also accepts a hex (instance) and if it does copies it ([9c46b96](https://github.com/flauwekeul/honeycomb/commit/9c46b9692e3edb5c36cfa16677fa4843394f1939))
* **hex:** normalize and assert all required hex prototype properties in createHexPrototype() ([bc52d04](https://github.com/flauwekeul/honeycomb/commit/bc52d04e9308e3adf37f00c34cf86e4227e75555))
* **hex:** rename createToPoint() to hexToPoint() and make it accept a hex ([4e8e48c](https://github.com/flauwekeul/honeycomb/commit/4e8e48c11047a995ddd2c9cd737807f774dad208))
* **hex:** rename size to dimensions and normalize dimensions in createHexPrototype() ([6da0323](https://github.com/flauwekeul/honeycomb/commit/6da03232250e03473f494435140daddd285c0959))
* **hex:** set hex origin relative to center of hex ([c5609e2](https://github.com/flauwekeul/honeycomb/commit/c5609e246671a18750123a1b368424decb60e215))
* **hex:** store s cube coordinate when passed to createHex, otherwise use getter ([c7d2df0](https://github.com/flauwekeul/honeycomb/commit/c7d2df042f5150e91af5a29dd5265d6e242debfe))
* **hex:** use axial coordinates by default ([b900384](https://github.com/flauwekeul/honeycomb/commit/b9003841e04c159e30e3310c48f73545e53f1387))
* **hex,grid:** traversers return hexes (as before), fix move() traverser, add neighborOf() function ([f608928](https://github.com/flauwekeul/honeycomb/commit/f608928f8ef924ed2d1985c5bfbfa92801db1a65))
* add parcel-bundler and playground ([c1d40a1](https://github.com/flauwekeul/honeycomb/commit/c1d40a1dd57dbb90107096d7b6195c36b3a4ae94))
* createHexPrototype() adds several readonly properties (WIP) ([5060169](https://github.com/flauwekeul/honeycomb/commit/5060169c1c9e78f50fe6eafa5f1d222fb87f6403))
* first functionality of v4.0 (WIP) ([1d6613e](https://github.com/flauwekeul/honeycomb/commit/1d6613e12adb7c68f0e91daaaad0fa6690d32ab1))
* fix reference to type declaration and improve typing of `createHexPrototype()` ([9cb542c](https://github.com/flauwekeul/honeycomb/commit/9cb542c0ed68f23eba7a2b2e00a9182589325f27))
* remove cartesian coordinates for now ([7ff0dd5](https://github.com/flauwekeul/honeycomb/commit/7ff0dd5d242da256d1a77431465540fe56a96a3c))


### Bug Fixes

* **grid:** fix incorrect width or height calculation in Grid.rectangleFromOpposingCorners() ([2781428](https://github.com/flauwekeul/honeycomb/commit/2781428b503928bd07d258c5bb1cfa30817291e5))
* **grid:** fix neighborOf() (and functions that use it like move()) ([cd3363c](https://github.com/flauwekeul/honeycomb/commit/cd3363c442ae7b399ac7e6fe6eb13a38a187b867))
* **grid:** grids are now iterable again (e.g.: `[...grid]` or `for (const hex of grid) {})`) ([d131061](https://github.com/flauwekeul/honeycomb/commit/d131061d2cc85f329acc7b5b6d7522a8f273f57b))
* **hex:** when overriding a hex prototype method, `this` is now correctly typed ([812d89f](https://github.com/flauwekeul/honeycomb/commit/812d89f4c3a64386a8f803df3f97754d07bcd534)), closes [1#comment116992054_66162731](https://github.com/flauwekeul/1/issues/comment116992054_66162731)

### [3.1.7](https://github.com/flauwekeul/honeycomb/compare/v3.1.6...v3.1.7) (2020-05-02)


### Bug Fixes

* **typings:** improve enums ([b94ae75](https://github.com/flauwekeul/honeycomb/commit/b94ae75c40d40add0bde86f7dcc46ff0b6f4647e)), closes [#52](https://github.com/flauwekeul/honeycomb/issues/52)

### [3.1.6](https://github.com/flauwekeul/honeycomb/compare/v3.1.5...v3.1.6) (2020-05-02)


### Bug Fixes

* **typings:** improve typing of `extendHex()` ([19ada80](https://github.com/flauwekeul/honeycomb/commit/19ada803cb6c95db033384d436ea69a97335b7c7))

### [3.1.5](https://github.com/flauwekeul/honeycomb/compare/v3.1.4...v3.1.5) (2020-04-12)


### Bug Fixes

* **grid:** add missing types ([1c5d3a0](https://github.com/flauwekeul/honeycomb/commit/1c5d3a04379e6c17657b94116e3852407c7c0627))

### [3.1.4](https://github.com/flauwekeul/honeycomb/compare/v3.1.3...v3.1.4) (2020-03-18)

### [3.1.3](https://github.com/flauwekeul/honeycomb/compare/v3.1.2...v3.1.3) (2019-12-24)


### Bug Fixes

* **hex:** fix bug where nudging hexes with certain coordinates would throw an error ([cbb1db9](https://github.com/flauwekeul/honeycomb/commit/cbb1db97ef47c6f34531cde206c8e54a0b1479b1)), closes [#46](https://github.com/flauwekeul/honeycomb/issues/46)

### [3.1.2](https://github.com/flauwekeul/honeycomb/compare/v3.1.1...v3.1.2) (2019-12-15)


### Bug Fixes

* **hex:** fix bug where rounding a nudged hex would sometimes be incorrect ([eb846f8](https://github.com/flauwekeul/honeycomb/commit/eb846f8f239134c3d79cc48bf67aaba8a2471e90))

### [3.1.1](https://github.com/flauwekeul/honeycomb/compare/v3.1.0...v3.1.1) (2019-11-19)

## [3.1.0](https://github.com/flauwekeul/honeycomb/compare/v3.0.1...v3.1.0) (2019-10-03)


### Features

* **Grid:** add ring() shape method ([0949af3](https://github.com/flauwekeul/honeycomb/commit/0949af3))
* **Grid:** add spiral() shape method ([a80d087](https://github.com/flauwekeul/honeycomb/commit/a80d087))

### [3.0.1](https://github.com/flauwekeul/honeycomb/compare/v3.0.0...v3.0.1) (2019-09-25)

## [3.0.0](https://github.com/flauwekeul/honeycomb/compare/v2.1.0...v3.0.0) (2019-08-06)


### ⚠ BREAKING CHANGES

* **Grid:** arguments passed to the grid factory are no longer filtered for valid hexes; any
points (in the shape of a tuple or object) or hexes are converted to hexes and added to the returned
grid
* **Grid:** Grid#neighborsOf() no longer filters out nonexistent hexes. This makes it possible
to map each direction to a hex, because the length of the returned array is always equal to the
length of the passed directions array.

### Features

* **Grid:** grid factory now also accepts points and point-likes ([97a298d](https://github.com/flauwekeul/honeycomb/commit/97a298d)), closes [#34](https://github.com/flauwekeul/honeycomb/issues/34)
* **Grid:** remove filtering of nonexistent hexes from Grid#neighborsOf() ([6a6d27d](https://github.com/flauwekeul/honeycomb/commit/6a6d27d))
* **Hex:** add `toJSON()` static method ([d2d4c50](https://github.com/flauwekeul/honeycomb/commit/d2d4c50)), closes [#39](https://github.com/flauwekeul/honeycomb/issues/39)

## [2.1.0](https://github.com/flauwekeul/honeycomb/compare/v2.0.3...v2.1.0) (2019-06-28)


### Build System

* add and configure prettier formatter ([0ec4285](https://github.com/flauwekeul/honeycomb/commit/0ec4285))
* upgrade dependencies ([50e3db4](https://github.com/flauwekeul/honeycomb/commit/50e3db4))
* upgrade dependencies ([a97283a](https://github.com/flauwekeul/honeycomb/commit/a97283a))


### Features

* **Grid:** add pointHeight() and pointWidth() instance methods to Grid ([f229e46](https://github.com/flauwekeul/honeycomb/commit/f229e46)), closes [#32](https://github.com/flauwekeul/honeycomb/issues/32)
* **Grid:** add properties with which it was made to grid instance ([d8c36f3](https://github.com/flauwekeul/honeycomb/commit/d8c36f3))



### [2.0.3](https://github.com/flauwekeul/honeycomb/compare/v2.0.2...v2.0.3) (2019-06-01)


### Build System

* upgrade dependencies ([1763b1c](https://github.com/flauwekeul/honeycomb/commit/1763b1c))



### [2.0.2](https://github.com/flauwekeul/honeycomb/compare/v2.0.1...v2.0.2) (2019-06-01)


### Bug Fixes

* **Hex:** fix bug where Hex#equals() sometimes returns true while it should return false ([43d3e57](https://github.com/flauwekeul/honeycomb/commit/43d3e57))



### [2.0.1](https://github.com/flauwekeul/honeycomb/compare/v2.0.0...v2.0.1) (2019-05-09)



## [2.0.0](https://github.com/flauwekeul/honeycomb/compare/v1.4.4...v2.0.0) (2019-05-08)


### Build System

* lift minimal Node version from 6 to 8 ([3ab2260](https://github.com/flauwekeul/honeycomb/commit/3ab2260))
* upgrade dependencies ([f5d1f8e](https://github.com/flauwekeul/honeycomb/commit/f5d1f8e))


### Features

* **Hex:** add option to set size as width and height or x radius and y radius ([4ca42b3](https://github.com/flauwekeul/honeycomb/commit/4ca42b3))

### BREAKING CHANGES

* Dropped Node 6 support
* Removed Hex.oppositeCornerDistance() and Hex.oppositeSideDistance() methods because opposite corners
and sides no longer always have the same distance.



## [1.4.4](https://github.com/flauwekeul/honeycomb/compare/v1.4.4-0...v1.4.4) (2019-03-23)



## [1.4.4-0](https://github.com/flauwekeul/honeycomb/compare/v1.4.3...v1.4.4-0) (2019-03-01)


### Bug Fixes

* **typings:** attempt to fix typescript error TS2744 (since typescript 3.0) ([cac4cca](https://github.com/flauwekeul/honeycomb/commit/cac4cca))



<a name="1.4.3"></a>
## [1.4.3](https://github.com/flauwekeul/honeycomb/compare/v1.4.2...v1.4.3) (2019-02-08)



<a name="1.4.2"></a>
## [1.4.2](https://github.com/flauwekeul/honeycomb/compare/v1.4.1...v1.4.2) (2018-11-29)



<a name="1.4.1"></a>
## [1.4.1](https://github.com/flauwekeul/honeycomb/compare/v1.4.0...v1.4.1) (2018-11-14)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/flauwekeul/honeycomb/compare/v1.3.6...v1.4.0) (2018-10-06)


### Features

* **Grid:** add `Grid#hexesInRange()` ([c88bc0f](https://github.com/flauwekeul/honeycomb/commit/c88bc0f))



<a name="1.3.6"></a>
## [1.3.6](https://github.com/flauwekeul/honeycomb/compare/v1.3.5...v1.3.6) (2018-09-21)



<a name="1.3.5"></a>
## [1.3.5](https://github.com/flauwekeul/honeycomb/compare/v1.3.4...v1.3.5) (2018-07-20)



<a name="1.3.4"></a>
## [1.3.4](https://github.com/flauwekeul/honeycomb/compare/v1.3.3...v1.3.4) (2018-05-21)



<a name="1.3.3"></a>
## [1.3.3](https://github.com/flauwekeul/honeycomb/compare/v1.3.2...v1.3.3) (2018-03-20)


### Bug Fixes

* **typings:** improve Grid typings and override some method typings inherited from Array ([bf0d0b4](https://github.com/flauwekeul/honeycomb/commit/bf0d0b4))
* **typings:** improve typings, rename some types for brevity ([38ec4c4](https://github.com/flauwekeul/honeycomb/commit/38ec4c4))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/flauwekeul/honeycomb/compare/v1.3.1...v1.3.2) (2018-03-18)


### Bug Fixes

* **typings:** fix bug where a grid's methods inherited from `Array.prototype` returned `any[]` ([2cebcba](https://github.com/flauwekeul/honeycomb/commit/2cebcba))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/flauwekeul/honeycomb/compare/v1.3.0...v1.3.1) (2018-03-18)


### Bug Fixes

* types are now actually present in the released package ([bcb1576](https://github.com/flauwekeul/honeycomb/commit/bcb1576))
* **typings:** fix bug in `HexFactory()` typing that required all props of `T` ([3ec2eee](https://github.com/flauwekeul/honeycomb/commit/3ec2eee))
* **typings:** fix bug in Grid's shape methods' `start`/`center` property ([159b197](https://github.com/flauwekeul/honeycomb/commit/159b197))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/flauwekeul/honeycomb/compare/v1.2.0...v1.3.0) (2018-03-17)


### Bug Fixes

* Minor improvements to type definitions ([d3cd849](https://github.com/flauwekeul/honeycomb/commit/d3cd849))


### Features

* **Grid:** `Grid.pointToHex()` now accepts the same parameters as `Point()` ([89668f7](https://github.com/flauwekeul/honeycomb/commit/89668f7))
* **Hex:** `Hex#cartesianToCube()` now accepts the same parameters as `Point()` ([d414848](https://github.com/flauwekeul/honeycomb/commit/d414848))
* **Hex:** add `Hex#fromPoint()` ([d82ba48](https://github.com/flauwekeul/honeycomb/commit/d82ba48))
* **Point:** all Point methods now accept the same parameters as `Point()` ([7343b5f](https://github.com/flauwekeul/honeycomb/commit/7343b5f))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/flauwekeul/honeycomb/compare/v1.1.5...v1.2.0) (2018-03-16)


### Features

* add typescript type definitions file ([7d22f33](https://github.com/flauwekeul/honeycomb/commit/7d22f33))



<a name="1.1.5"></a>
## [1.1.5](https://github.com/flauwekeul/honeycomb/compare/v1.1.4...v1.1.5) (2018-03-02)



<a name="1.1.4"></a>
## [1.1.4](https://github.com/flauwekeul/honeycomb/compare/v1.1.3...v1.1.4) (2018-03-02)



<a name="1.1.3"></a>
## [1.1.3](https://github.com/flauwekeul/honeycomb/compare/v1.1.2...v1.1.3) (2018-02-25)


### Bug Fixes

* **Grid:** `Grid.Hex.thirdCoordinate` is no longer `undefined` ([47e7ac8](https://github.com/flauwekeul/honeycomb/commit/47e7ac8))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/flauwekeul/honeycomb/compare/v1.1.1...v1.1.2) (2018-02-19)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/flauwekeul/honeycomb/compare/v1.1.0...v1.1.1) (2018-02-18)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/flauwekeul/honeycomb/compare/v1.0.2...v1.1.0) (2018-02-17)


### Bug Fixes

* **Grid:** `Grid.pointToHex()` now subtracts the hex's center ([bad8e6f](https://github.com/flauwekeul/honeycomb/commit/bad8e6f))
* **Hex,Grid:** methods that were supposed to accept points, now actually accept points ([b213286](https://github.com/flauwekeul/honeycomb/commit/b213286))


### Features

* **Grid:** `Grid#get()` now also accepts a number (index) ([02978cf](https://github.com/flauwekeul/honeycomb/commit/02978cf))
* **Grid:** `Grid#set()` now also accepts an index and doesn't return a grid copy anymore ([7a6b84b](https://github.com/flauwekeul/honeycomb/commit/7a6b84b))
* **Grid:** add `Grid#set()` method that replaces a hex with the another hex ([f7b9ea5](https://github.com/flauwekeul/honeycomb/commit/f7b9ea5))
* **Hex:** add `Hex#center()` method that returns the center point relative to the hex's origin ([2ed9a19](https://github.com/flauwekeul/honeycomb/commit/2ed9a19))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/flauwekeul/honeycomb/compare/v1.0.1...v1.0.2) (2018-02-11)


### Bug Fixes

* **Grid:** `Grid.pointToHex()` now actually translates a point to a hex ([9b3aefb](https://github.com/flauwekeul/honeycomb/commit/9b3aefb))
* **Hex:** `Hex#corners()` now returns the corner points relative to the hex's origin ([5f3163b](https://github.com/flauwekeul/honeycomb/commit/5f3163b))
* **Hex:** `Hex#toPoint()` no longer falsely subtracts its origin ([bdbc638](https://github.com/flauwekeul/honeycomb/commit/bdbc638))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/flauwekeul/honeycomb/compare/v1.0.0...v1.0.1) (2018-02-10)


### Performance Improvements

* **Point:** minor performance improvement for instance methods ([d283c6b](https://github.com/flauwekeul/honeycomb/commit/d283c6b))


### Reverts

* **Point:** add previously deleted `Point` instance methods again ([034858e](https://github.com/flauwekeul/honeycomb/commit/034858e))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/flauwekeul/honeycomb/compare/v0.6.1...v1.0.0) (2018-02-10)


### Bug Fixes

* **All:** update relevant Grid and Hex methods to use new cube coordinates ([604a687](https://github.com/flauwekeul/honeycomb/commit/604a687))
* **Grid:** `Grid#neighborOf()` and `Grid#neighborsOf()` now return actual hexes present in the grid ([f42906d](https://github.com/flauwekeul/honeycomb/commit/f42906d))
* **Grid:** `Grid#neighborsOf()` now only returns the hexes present in the grid ([a137021](https://github.com/flauwekeul/honeycomb/commit/a137021))
* **Grid:** `Grid#splice` now deletes all hexes from the passed `start` param if no `deleteCount` is passed, in ([ee90113](https://github.com/flauwekeul/honeycomb/commit/ee90113))
* **Grid:** fix bug where creating a huge grid (at least 1,000,000 hexes) resulted in a "Maximum call stack size exceeded." error ([67dd3c2](https://github.com/flauwekeul/honeycomb/commit/67dd3c2))
* **Hex:** `extendHex()` no longer changes *all* Hex factories created by it ([e88d9ed](https://github.com/flauwekeul/honeycomb/commit/e88d9ed))
* **Hex:** hexes now never have negative zeroes ([7afdfe1](https://github.com/flauwekeul/honeycomb/commit/7afdfe1))
* **Hex:** remove methods that were previously moved to `Grid` from `Hex` ([a81978f](https://github.com/flauwekeul/honeycomb/commit/a81978f))


### Features

* **API:** improve API naming ([c25d98e](https://github.com/flauwekeul/honeycomb/commit/c25d98e))
* **API:** rearrange API and add factory for creating grids ([5a63dcc](https://github.com/flauwekeul/honeycomb/commit/5a63dcc))
* **Grid:** `Grid.hexagon()`'s radius option now excludes the center hex ([aba5411](https://github.com/flauwekeul/honeycomb/commit/aba5411))
* **Grid:** `Grid#indexOf` and `Grid#includes` no longer require a valid hex; any hex-like will do ([f6eccbe](https://github.com/flauwekeul/honeycomb/commit/f6eccbe))
* **Grid:** `Grid#indexOf` now accepts negative `fromIndex` param; correctly implemented `Grid#lastIndexOf` ([d8beda6](https://github.com/flauwekeul/honeycomb/commit/d8beda6))
* **Grid:** `Grid#neighborsOf` no longer accepts an option object ([6ed1740](https://github.com/flauwekeul/honeycomb/commit/6ed1740))
* **Grid:** `Grid#neighborsOf` now accepts compass (e.g. NE, SW) directions ([ec2453f](https://github.com/flauwekeul/honeycomb/commit/ec2453f))
* **Grid:** `Grid#neighborsOf` now also accepts a single number direction ([75b447e](https://github.com/flauwekeul/honeycomb/commit/75b447e))
* **Grid:** add `Grid.isValidHex()` static function ([3022bf7](https://github.com/flauwekeul/honeycomb/commit/3022bf7))
* **Grid:** add `Grid#get()` and moved `Hex#hexesBetween()` to `Grid#hexesBetween()` ([4a522d6](https://github.com/flauwekeul/honeycomb/commit/4a522d6))
* **Grid:** add `onCreate` callback to each Grid shape method that gets called for each created hex, ([e1fc90e](https://github.com/flauwekeul/honeycomb/commit/e1fc90e))
* **Grid:** any valid hexes in an array that's passed to Grid() are filtered out ([e60b726](https://github.com/flauwekeul/honeycomb/commit/e60b726))
* **Grid:** for all Grid's shape methods, the `onCreate` callback is now called with the current hex *and* the grid ([e1fb2ec](https://github.com/flauwekeul/honeycomb/commit/e1fb2ec))
* **Grid:** Grid now accepts arguments, filters the valid hexes and returns a grid with those hexes ([4f7726d](https://github.com/flauwekeul/honeycomb/commit/4f7726d))
* **Grid:** Grid() returns an instance of a Grid class that extends Array ([351bf35](https://github.com/flauwekeul/honeycomb/commit/351bf35))
* **Grid:** implement `Grid#fill()` and `Grid#includes()` prototype methods ([821e004](https://github.com/flauwekeul/honeycomb/commit/821e004))
* **Grid:** implement `Grid#indexOf()` ([4944abe](https://github.com/flauwekeul/honeycomb/commit/4944abe))
* **Grid:** implement `Grid#lastIndexOf()` ([ae03a90](https://github.com/flauwekeul/honeycomb/commit/ae03a90))
* **Grid:** implement `Grid#push()` ([4723cf8](https://github.com/flauwekeul/honeycomb/commit/4723cf8))
* **Grid:** implement `Grid#splice()` ([620a159](https://github.com/flauwekeul/honeycomb/commit/620a159))
* **Grid:** implement `Grid#unshift()` ([37bbd8b](https://github.com/flauwekeul/honeycomb/commit/37bbd8b))
* **Grid:** improve `Grid.rectangle` ([094cac9](https://github.com/flauwekeul/honeycomb/commit/094cac9))
* **Grid:** improve api of `Grid#neighborOf` and `Grid#neighborsOf` methods ([4887f2e](https://github.com/flauwekeul/honeycomb/commit/4887f2e))
* **Grid:** make the Hex factory an optional param for Grid() ([d473870](https://github.com/flauwekeul/honeycomb/commit/d473870))
* **Grid:** merge `Grid#neighborOf` into `Grid#neighborsOf` ([cb0372b](https://github.com/flauwekeul/honeycomb/commit/cb0372b))
* **Grid:** move `Hex#neighbor()` and `Hex#neighbors()` to `Grid#neighborOf()` and `Grid#neighborsOf()` ([57da406](https://github.com/flauwekeul/honeycomb/commit/57da406))
* **Grid:** move existing Grid prototype methods to Grid static methods ([32b6e8d](https://github.com/flauwekeul/honeycomb/commit/32b6e8d))
* **Grid:** remove `colSize()` and `rowSize()` static methods from Grid ([00e7fa6](https://github.com/flauwekeul/honeycomb/commit/00e7fa6))
* **Grid:** when passed a valid grid, Grid() returns a copy of that grid ([f9d977d](https://github.com/flauwekeul/honeycomb/commit/f9d977d))
* **hex:** made nearly all static Hex methods instance methods ([2edfa82](https://github.com/flauwekeul/honeycomb/commit/2edfa82))
* **Hex:** add `equals()` method to Hex that returns whether the passed hex's coordinates equal the ([69e92aa](https://github.com/flauwekeul/honeycomb/commit/69e92aa))
* **Hex:** add `Hex#set()` method that overwrites the instance with the passed properties ([9cbdd85](https://github.com/flauwekeul/honeycomb/commit/9cbdd85))
* **Hex:** add `Hex#toString()` ([d0764fe](https://github.com/flauwekeul/honeycomb/commit/d0764fe))
* **Hex:** add `toCartesian()` and `toCube()` alias methods ([1cee56c](https://github.com/flauwekeul/honeycomb/commit/1cee56c))
* **Hex:** add possibility to pass custom properties when creating a hex ([82d195e](https://github.com/flauwekeul/honeycomb/commit/82d195e))
* **Hex:** any custom properties are now transferred to the new hex returned by `Hex#add()`, `Hex#su ([9c7ec84](https://github.com/flauwekeul/honeycomb/commit/9c7ec84))
* **Hex:** expose `HexFactory` from Honeycomb and make Grid require a `Hex` factory ([db4746b](https://github.com/flauwekeul/honeycomb/commit/db4746b))
* **Hex:** hex orientation can now also be set with a lowercase string 🙃 ([f919bac](https://github.com/flauwekeul/honeycomb/commit/f919bac))
* **Hex:** hexes now only contain x and y coordinates ([e96e276](https://github.com/flauwekeul/honeycomb/commit/e96e276))
* **Hex:** made orientation and offset enums singular and their values lowercase ([f225a5d](https://github.com/flauwekeul/honeycomb/commit/f225a5d))
* **Hex:** made x and y cartesian coordinates and q, r and s cube coordinates ([7fd7c46](https://github.com/flauwekeul/honeycomb/commit/7fd7c46))
* **Hex:** make `Hex()` accept an array with 0 or more coordinates ([cd79354](https://github.com/flauwekeul/honeycomb/commit/cd79354))
* **Hex:** throw an error when a hex is created with < 3 cube coordinates ([500e796](https://github.com/flauwekeul/honeycomb/commit/500e796))
* **Hex:** throw error when cube coordinates don't sum to 0 ([8182413](https://github.com/flauwekeul/honeycomb/commit/8182413))
* **Hex#neighbors:** add diagonal flag that enables getting the diagonal neighbors of a hex ([82eca1a](https://github.com/flauwekeul/honeycomb/commit/82eca1a))
* **Point:** remove `Point`'s prototype ([1991e2b](https://github.com/flauwekeul/honeycomb/commit/1991e2b))
* **Utils:** _toNumberDirection throws an error when an invalid compass direction is passed ([2c25775](https://github.com/flauwekeul/honeycomb/commit/2c25775))
* **Utils:** when called with an ambiguous compass direction, `_toNumberDirection` throws an error ([9b38727](https://github.com/flauwekeul/honeycomb/commit/9b38727))
* **view:** remove everything related to the view ([1decae5](https://github.com/flauwekeul/honeycomb/commit/1decae5))


### Performance Improvements

* **Grid:** improve performance of Grid shape methods ([0f0ba5b](https://github.com/flauwekeul/honeycomb/commit/0f0ba5b))
* **Grid:** made `Grid#get()` much faster ([c097ef8](https://github.com/flauwekeul/honeycomb/commit/c097ef8))
* **Hex:** improve performance of some hex methods ([f825723](https://github.com/flauwekeul/honeycomb/commit/f825723))
* **Hex:** minor performance improvement when creating hexes ([f542a37](https://github.com/flauwekeul/honeycomb/commit/f542a37))


### Reverts

* **Grid:** passing a valid Honeycomb grid no longer returns a copy ([dd214e5](https://github.com/flauwekeul/honeycomb/commit/dd214e5))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/flauwekeul/honeycomb/compare/v0.6.1...v0.7.0) (2017-09-28)


### Features

* **view:** remove everything related to the view ([11988e1](https://github.com/flauwekeul/honeycomb/commit/11988e1))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/flauwekeul/honeycomb/compare/v0.6.0...v0.6.1) (2017-05-28)


### Bug Fixes

* **view:** fix broken `View#renderGrid` ([0b27cfe](https://github.com/flauwekeul/honeycomb/commit/0b27cfe))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/flauwekeul/honeycomb/compare/v0.5.1...v0.6.0) (2017-05-26)


### Features

* **grid:** the grid shape methods now only accept an options object ([26d3c49](https://github.com/flauwekeul/honeycomb/commit/26d3c49))
* **hex-point translation:** make a hex's origin be relative to its center ([690be7d](https://github.com/flauwekeul/honeycomb/commit/690be7d))
* **point:** Point accepts an array/object with a single coordinate ([6208813](https://github.com/flauwekeul/honeycomb/commit/6208813))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/flauwekeul/honeycomb/compare/v0.5.0...v0.5.1) (2017-05-18)


### Features

* **Hex:** add `Hex.neighbors()` static method ([bd80194](https://github.com/flauwekeul/honeycomb/commit/bd80194))
* **Hex:** custom properties can be added to the `Hex` prototype shared by all hexes in a grid ([2ca60bd](https://github.com/flauwekeul/honeycomb/commit/2ca60bd))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/flauwekeul/honeycomb/compare/v0.4.2...v0.5.0) (2017-05-16)


### Features

* **grid:** replace "compass" directions by integer directions ([d4398f6](https://github.com/flauwekeul/honeycomb/commit/d4398f6))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/flauwekeul/honeycomb/compare/v0.4.1...v0.4.2) (2017-05-10)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/flauwekeul/honeycomb/compare/v0.4.0...v0.4.1) (2017-05-10)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/flauwekeul/honeycomb/compare/v0.3.3...v0.4.0) (2017-05-09)



<a name="0.3.3"></a>
## [0.3.3](https://github.com/flauwekeul/honeycomb/compare/v0.3.2...v0.3.3) (2017-05-08)
