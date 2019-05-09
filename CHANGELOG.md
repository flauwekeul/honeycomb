# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
