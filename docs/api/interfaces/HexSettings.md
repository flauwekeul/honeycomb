# Interface: HexSettings

## Properties

### <a id="dimensions" name="dimensions"></a> dimensions

 **dimensions**: [`Ellipse`](Ellipse.md)

An object with an `xRadius` and `yRadius`. There are two radiuses to make it possible to have "wide" (`xRadius` > `yRadius`) or "tall" (`xRadius` < `yRadius`) hexes.

#### Defined in

[hex/types.ts:82](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L82)

___

### <a id="offset" name="offset"></a> offset

 **offset**: [`HexOffset`](../index.md#HexOffset)

In a grid with pointy hexes, each row is offsetted half a hex relative to the previous row. In grids with flat hexes, this applies to the columns.
Redblobgames has a [visual example](https://www.redblobgames.com/grids/hexagons/#coordinates-offset).

Set the offset property to `1` or `-1` (the default) to control whether the even or odd rows/columns are offsetted.

#### Defined in

[hex/types.ts:100](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L100)

___

### <a id="orientation" name="orientation"></a> orientation

 **orientation**: [`Orientation`](../index.md#Orientation)

Either pointy ⬢ (the default) or flat ⬣.

#### Defined in

[hex/types.ts:86](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L86)

___

### <a id="origin" name="origin"></a> origin

 **origin**: [`Point`](Point.md)

If a hex is [converted to a point](/api/#hexToPoint), its origin point is crucial.
The origin is relative to a hex's center, so an origin of `{ x: 0, y: 0 }` (the default) means its center.
An origin of `{ x: 10, y: 5 }` means 10 right and 5 down from the center. `{ x: -5, y: -10 }` means 5 left, 10 up.
You get the `Point` 🙃.

#### Defined in

[hex/types.ts:93](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L93)
