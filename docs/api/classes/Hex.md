# Class: Hex

## Implements

- `Readonly`<[`CubeCoordinates`](../interfaces/CubeCoordinates.md)\>
- `Readonly`<[`OffsetCoordinates`](../interfaces/OffsetCoordinates.md)\>
- `Readonly`<[`Point`](../interfaces/Point.md)\>
- `Readonly`<[`BoundingBox`](../interfaces/BoundingBox.md)\>

## Table of contents

### Constructors

- [constructor](Hex.md#constructor)

### Properties

- [q](Hex.md#q)
- [r](Hex.md#r)

### Accessors

- [center](Hex.md#center)
- [col](Hex.md#col)
- [corners](Hex.md#corners)
- [dimensions](Hex.md#dimensions)
- [height](Hex.md#height)
- [isFlat](Hex.md#isFlat)
- [isPointy](Hex.md#isPointy)
- [offset](Hex.md#offset)
- [orientation](Hex.md#orientation)
- [origin](Hex.md#origin)
- [row](Hex.md#row)
- [s](Hex.md#s)
- [settings](Hex.md#settings)
- [width](Hex.md#width)
- [x](Hex.md#x)
- [y](Hex.md#y)

### Methods

- [clone](Hex.md#clone)
- [equals](Hex.md#equals)
- [toString](Hex.md#toString)
- [translate](Hex.md#translate)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

**new Hex**(`coordinates?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Defined in

[hex/hex.ts:103](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L103)

## Properties

### <a id="q" name="q"></a> q

 `Readonly` **q**: `number`

#### Implementation of

Readonly.q

#### Defined in

[hex/hex.ts:100](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L100)

___

### <a id="r" name="r"></a> r

 `Readonly` **r**: `number`

#### Implementation of

Readonly.r

#### Defined in

[hex/hex.ts:101](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L101)

## Accessors

### <a id="center" name="center"></a> center

`get` **center**(): [`Point`](../interfaces/Point.md)

#### Returns

[`Point`](../interfaces/Point.md)

#### Defined in

[hex/hex.ts:29](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L29)

___

### <a id="col" name="col"></a> col

`get` **col**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.col

#### Defined in

[hex/hex.ts:34](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L34)

___

### <a id="corners" name="corners"></a> corners

`get` **corners**(): [`Point`](../interfaces/Point.md)[]

#### Returns

[`Point`](../interfaces/Point.md)[]

#### Defined in

[hex/hex.ts:39](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L39)

___

### <a id="dimensions" name="dimensions"></a> dimensions

`get` **dimensions**(): [`Ellipse`](../interfaces/Ellipse.md)

#### Returns

[`Ellipse`](../interfaces/Ellipse.md)

#### Defined in

[hex/hex.ts:44](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L44)

___

### <a id="height" name="height"></a> height

`get` **height**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.height

#### Defined in

[hex/hex.ts:48](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L48)

___

### <a id="isFlat" name="isFlat"></a> isFlat

`get` **isFlat**(): `boolean`

#### Returns

`boolean`

#### Defined in

[hex/hex.ts:56](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L56)

___

### <a id="isPointy" name="isPointy"></a> isPointy

`get` **isPointy**(): `boolean`

#### Returns

`boolean`

#### Defined in

[hex/hex.ts:60](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L60)

___

### <a id="offset" name="offset"></a> offset

`get` **offset**(): [`HexOffset`](../index.md#HexOffset)

#### Returns

[`HexOffset`](../index.md#HexOffset)

#### Defined in

[hex/hex.ts:72](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L72)

___

### <a id="orientation" name="orientation"></a> orientation

`get` **orientation**(): [`Orientation`](../enums/Orientation.md)

#### Returns

[`Orientation`](../enums/Orientation.md)

#### Defined in

[hex/hex.ts:64](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L64)

___

### <a id="origin" name="origin"></a> origin

`get` **origin**(): [`Point`](../interfaces/Point.md)

#### Returns

[`Point`](../interfaces/Point.md)

#### Defined in

[hex/hex.ts:68](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L68)

___

### <a id="row" name="row"></a> row

`get` **row**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.row

#### Defined in

[hex/hex.ts:76](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L76)

___

### <a id="s" name="s"></a> s

`get` **s**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.s

#### Defined in

[hex/hex.ts:96](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L96)

___

### <a id="settings" name="settings"></a> settings

`Static` `get` **settings**(): [`HexSettings`](../interfaces/HexSettings.md)

#### Returns

[`HexSettings`](../interfaces/HexSettings.md)

#### Defined in

[hex/hex.ts:22](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L22)

___

### <a id="width" name="width"></a> width

`get` **width**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.width

#### Defined in

[hex/hex.ts:80](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L80)

___

### <a id="x" name="x"></a> x

`get` **x**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.x

#### Defined in

[hex/hex.ts:88](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L88)

___

### <a id="y" name="y"></a> y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.y

#### Defined in

[hex/hex.ts:92](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L92)

## Methods

### <a id="clone" name="clone"></a> clone

**clone**<`T`\>(`newProps?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`T`

#### Defined in

[hex/hex.ts:109](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L109)

___

### <a id="equals" name="equals"></a> equals

**equals**(`coordinates`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`boolean`

#### Defined in

[hex/hex.ts:113](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L113)

___

### <a id="toString" name="toString"></a> toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[hex/hex.ts:117](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L117)

___

### <a id="translate" name="translate"></a> translate

**translate**(`delta`): [`Hex`](Hex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | [`PartialCubeCoordinates`](../index.md#PartialCubeCoordinates) |

#### Returns

[`Hex`](Hex.md)

#### Defined in

[hex/hex.ts:121](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L121)
