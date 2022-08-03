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

[hex/types.ts:89](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L89)

___

### <a id="__isHoneycombHex" name="__isHoneycombHex"></a> \_\_isHoneycombHex

 `Readonly` **\_\_isHoneycombHex**: ``true``

#### Defined in

[hex/types.ts:88](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L88)

___

### <a id="center" name="center"></a> center

 `Readonly` **center**: [`Point`](Point.md)

#### Defined in

[hex/types.ts:90](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L90)

___

### <a id="col" name="col"></a> col

 `Readonly` **col**: `number`

#### Defined in

[hex/types.ts:91](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L91)

___

### <a id="corners" name="corners"></a> corners

 `Readonly` **corners**: [`Point`](Point.md)[]

#### Defined in

[hex/types.ts:92](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L92)

___

### <a id="dimensions" name="dimensions"></a> dimensions

 **dimensions**: [`Ellipse`](Ellipse.md)

#### Inherited from

[HexSettings](HexSettings.md).[dimensions](HexSettings.md#dimensions)

#### Defined in

[hex/types.ts:78](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L78)

___

### <a id="height" name="height"></a> height

 `Readonly` **height**: `number`

#### Defined in

[hex/types.ts:93](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L93)

___

### <a id="isFlat" name="isFlat"></a> isFlat

 `Readonly` **isFlat**: `boolean`

#### Defined in

[hex/types.ts:94](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L94)

___

### <a id="isPointy" name="isPointy"></a> isPointy

 `Readonly` **isPointy**: `boolean`

#### Defined in

[hex/types.ts:95](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L95)

___

### <a id="offset" name="offset"></a> offset

 **offset**: `number`

#### Inherited from

[HexSettings](HexSettings.md).[offset](HexSettings.md#offset)

#### Defined in

[hex/types.ts:81](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L81)

___

### <a id="orientation" name="orientation"></a> orientation

 **orientation**: [`Orientation`](../enums/Orientation.md)

#### Inherited from

[HexSettings](HexSettings.md).[orientation](HexSettings.md#orientation)

#### Defined in

[hex/types.ts:79](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L79)

___

### <a id="origin" name="origin"></a> origin

 **origin**: [`Point`](Point.md)

#### Inherited from

[HexSettings](HexSettings.md).[origin](HexSettings.md#origin)

#### Defined in

[hex/types.ts:80](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L80)

___

### <a id="row" name="row"></a> row

 `Readonly` **row**: `number`

#### Defined in

[hex/types.ts:96](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L96)

___

### <a id="s" name="s"></a> s

 **s**: `number`

#### Defined in

[hex/types.ts:101](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L101)

___

### <a id="width" name="width"></a> width

 `Readonly` **width**: `number`

#### Defined in

[hex/types.ts:97](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L97)

___

### <a id="x" name="x"></a> x

 `Readonly` **x**: `number`

#### Defined in

[hex/types.ts:98](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L98)

___

### <a id="y" name="y"></a> y

 `Readonly` **y**: `number`

#### Defined in

[hex/types.ts:99](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L99)

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

[hex/types.ts:104](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L104)

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

[hex/types.ts:103](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L103)

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

[hex/types.ts:105](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L105)
