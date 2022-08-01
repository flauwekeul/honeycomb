# Interface: HexPrototype

## Hierarchy

- [`HexSettings`](HexSettings.md)

  ↳ **`HexPrototype`**

  ↳↳ [`Hex`](Hex.md)

## Table of contents

### Properties

- [[toStringTag]](HexPrototype.md#[toStringTag])
- [\_\_isHoneycombHex](HexPrototype.md#__isHoneycombHex)
- [center](HexPrototype.md#center)
- [col](HexPrototype.md#col)
- [corners](HexPrototype.md#corners)
- [dimensions](HexPrototype.md#dimensions)
- [height](HexPrototype.md#height)
- [isFlat](HexPrototype.md#isFlat)
- [isPointy](HexPrototype.md#isPointy)
- [offset](HexPrototype.md#offset)
- [orientation](HexPrototype.md#orientation)
- [origin](HexPrototype.md#origin)
- [row](HexPrototype.md#row)
- [s](HexPrototype.md#s)
- [width](HexPrototype.md#width)
- [x](HexPrototype.md#x)
- [y](HexPrototype.md#y)

### Methods

- [clone](HexPrototype.md#clone)
- [equals](HexPrototype.md#equals)
- [toString](HexPrototype.md#toString)

## Properties

### <a id="[toStringTag]" name="[toStringTag]"></a> [toStringTag]

 `Readonly` **[toStringTag]**: ``"Hex"``

#### Defined in

[hex/types.ts:57](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L57)

___

### <a id="__isHoneycombHex" name="__isHoneycombHex"></a> \_\_isHoneycombHex

 `Readonly` **\_\_isHoneycombHex**: ``true``

#### Defined in

[hex/types.ts:56](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L56)

___

### <a id="center" name="center"></a> center

 `Readonly` **center**: [`Point`](Point.md)

#### Defined in

[hex/types.ts:58](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L58)

___

### <a id="col" name="col"></a> col

 `Readonly` **col**: `number`

#### Defined in

[hex/types.ts:59](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L59)

___

### <a id="corners" name="corners"></a> corners

 `Readonly` **corners**: [`Point`](Point.md)[]

#### Defined in

[hex/types.ts:60](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L60)

___

### <a id="dimensions" name="dimensions"></a> dimensions

 **dimensions**: [`Ellipse`](Ellipse.md)

#### Inherited from

[HexSettings](HexSettings.md).[dimensions](HexSettings.md#dimensions)

#### Defined in

[hex/types.ts:49](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L49)

___

### <a id="height" name="height"></a> height

 `Readonly` **height**: `number`

#### Defined in

[hex/types.ts:61](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L61)

___

### <a id="isFlat" name="isFlat"></a> isFlat

 `Readonly` **isFlat**: `boolean`

#### Defined in

[hex/types.ts:62](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L62)

___

### <a id="isPointy" name="isPointy"></a> isPointy

 `Readonly` **isPointy**: `boolean`

#### Defined in

[hex/types.ts:63](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L63)

___

### <a id="offset" name="offset"></a> offset

 **offset**: `number`

#### Inherited from

[HexSettings](HexSettings.md).[offset](HexSettings.md#offset)

#### Defined in

[hex/types.ts:52](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L52)

___

### <a id="orientation" name="orientation"></a> orientation

 **orientation**: [`Orientation`](../enums/Orientation.md)

#### Inherited from

[HexSettings](HexSettings.md).[orientation](HexSettings.md#orientation)

#### Defined in

[hex/types.ts:50](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L50)

___

### <a id="origin" name="origin"></a> origin

 **origin**: [`Point`](Point.md)

#### Inherited from

[HexSettings](HexSettings.md).[origin](HexSettings.md#origin)

#### Defined in

[hex/types.ts:51](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L51)

___

### <a id="row" name="row"></a> row

 `Readonly` **row**: `number`

#### Defined in

[hex/types.ts:64](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L64)

___

### <a id="s" name="s"></a> s

 **s**: `number`

#### Defined in

[hex/types.ts:69](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L69)

___

### <a id="width" name="width"></a> width

 `Readonly` **width**: `number`

#### Defined in

[hex/types.ts:65](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L65)

___

### <a id="x" name="x"></a> x

 `Readonly` **x**: `number`

#### Defined in

[hex/types.ts:66](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L66)

___

### <a id="y" name="y"></a> y

 `Readonly` **y**: `number`

#### Defined in

[hex/types.ts:67](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L67)

## Methods

### <a id="clone" name="clone"></a> clone

**clone**(`this`, `newProps?`): [`HexPrototype`](HexPrototype.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`HexPrototype`](HexPrototype.md) |
| `newProps?` | [`HexCoordinates`](../index.md#HexCoordinates) \| `Partial`<[`HexPrototype`](HexPrototype.md)\> |

#### Returns

[`HexPrototype`](HexPrototype.md)

#### Defined in

[hex/types.ts:72](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L72)

___

### <a id="equals" name="equals"></a> equals

**equals**(`this`, `coordinates`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`HexPrototype`](HexPrototype.md) |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`boolean`

#### Defined in

[hex/types.ts:71](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L71)

___

### <a id="toString" name="toString"></a> toString

**toString**(`this`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`HexPrototype`](HexPrototype.md) |

#### Returns

`string`

#### Defined in

[hex/types.ts:73](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L73)
