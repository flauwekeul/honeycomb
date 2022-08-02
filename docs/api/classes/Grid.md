# Class: Grid<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md) |

## Implements

- `Iterable`<`T`\>

## Table of contents

### Methods

- [[iterator]](Grid.md#[iterator])
- [createHex](Grid.md#createHex)
- [distance](Grid.md#distance)
- [filter](Grid.md#filter)
- [forEach](Grid.md#forEach)
- [fromIterable](Grid.md#fromIterable)
- [fromJSON](Grid.md#fromJSON)
- [getHex](Grid.md#getHex)
- [hasHex](Grid.md#hasHex)
- [map](Grid.md#map)
- [neighborOf](Grid.md#neighborOf)
- [pointToHex](Grid.md#pointToHex)
- [reduce](Grid.md#reduce)
- [setHexes](Grid.md#setHexes)
- [toArray](Grid.md#toArray)
- [toJSON](Grid.md#toJSON)
- [toString](Grid.md#toString)
- [traverse](Grid.md#traverse)

### Properties

- [[toStringTag]](Grid.md#[toStringTag])
- [hexPrototype](Grid.md#hexPrototype)

### Constructors

- [constructor](Grid.md#constructor)

### Accessors

- [pixelHeight](Grid.md#pixelHeight)
- [pixelWidth](Grid.md#pixelWidth)
- [size](Grid.md#size)

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

**[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Implementation of

Iterable.\_\_@iterator@100

#### Defined in

[grid/grid.ts:63](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L63)

___

### <a id="createHex" name="createHex"></a> createHex

**createHex**(`coordinates?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates?` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`T`

#### Defined in

[grid/grid.ts:86](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L86)

___

### <a id="distance" name="distance"></a> distance

**distance**(`from`, `to`, `options?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `to` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `options?` | `Object` |
| `options.allowOutside` | ``true`` |

#### Returns

`number`

#### Defined in

[grid/grid.ts:201](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L201)

**distance**(`from`, `to`, `options`): ``null`` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `to` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `options` | `Object` |
| `options.allowOutside` | ``false`` |

#### Returns

``null`` \| `number`

#### Defined in

[grid/grid.ts:202](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L202)

___

### <a id="filter" name="filter"></a> filter

**filter**(`predicate`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`hex`: `T`) => `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:106](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L106)

___

### <a id="forEach" name="forEach"></a> forEach

**forEach**(`fn`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hex`: `T`) => `void` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:145](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L145)

___

### <a id="fromIterable" name="fromIterable"></a> fromIterable

`Static` **fromIterable**<`T`\>(`hexes`): [`Grid`](Grid.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L9)

___

### <a id="fromJSON" name="fromJSON"></a> fromJSON

`Static` **fromJSON**<`T`\>(`__namedParameters`): [`Grid`](Grid.md)<[`Hex`](../interfaces/Hex.md)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GridAsJSON`](../interfaces/GridAsJSON.md)<`T`\> |

#### Returns

[`Grid`](Grid.md)<[`Hex`](../interfaces/Hex.md)\>

#### Defined in

[grid/grid.ts:19](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L19)

___

### <a id="getHex" name="getHex"></a> getHex

**getHex**(`coordinates`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`undefined` \| `T`

#### Defined in

[grid/grid.ts:90](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L90)

___

### <a id="hasHex" name="hasHex"></a> hasHex

**hasHex**(`hex`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |

#### Returns

`boolean`

#### Defined in

[grid/grid.ts:95](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L95)

___

### <a id="map" name="map"></a> map

**map**(`fn`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hex`: `T`) => `T` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:116](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L116)

___

### <a id="neighborOf" name="neighborOf"></a> neighborOf

**neighborOf**(`hex`, `direction`, `options?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `direction` | [`CompassDirection`](../enums/CompassDirection.md) |
| `options?` | `Object` |
| `options.allowOutside` | ``true`` |

#### Returns

`T`

#### Defined in

[grid/grid.ts:215](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L215)

**neighborOf**(`hex`, `direction`, `options`): ``null`` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `direction` | [`CompassDirection`](../enums/CompassDirection.md) |
| `options` | `Object` |
| `options.allowOutside` | ``false`` |

#### Returns

``null`` \| `T`

#### Defined in

[grid/grid.ts:216](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L216)

___

### <a id="pointToHex" name="pointToHex"></a> pointToHex

**pointToHex**(`point`, `options?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](../interfaces/Point.md) |
| `options?` | `Object` |
| `options.allowOutside` | ``true`` |

#### Returns

`T`

#### Defined in

[grid/grid.ts:186](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L186)

**pointToHex**(`point`, `options`): ``null`` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](../interfaces/Point.md) |
| `options` | `Object` |
| `options.allowOutside` | ``false`` |

#### Returns

``null`` \| `T`

#### Defined in

[grid/grid.ts:187](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L187)

___

### <a id="reduce" name="reduce"></a> reduce

**reduce**(`reducer`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |

#### Returns

`T`

#### Defined in

[grid/grid.ts:152](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L152)

**reduce**(`reducer`, `initialValue`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |
| `initialValue` | `T` |

#### Returns

`T`

#### Defined in

[grid/grid.ts:153](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L153)

**reduce**<`R`\>(`reducer`, `initialValue`): `R`

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`result`: `R`, `hex`: `T`) => `R` |
| `initialValue` | `R` |

#### Returns

`R`

#### Defined in

[grid/grid.ts:154](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L154)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexes`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:99](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L99)

___

### <a id="toArray" name="toArray"></a> toArray

**toArray**(): `T`[]

#### Returns

`T`[]

#### Defined in

[grid/grid.ts:174](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L174)

___

### <a id="toJSON" name="toJSON"></a> toJSON

**toJSON**(): [`GridAsJSON`](../interfaces/GridAsJSON.md)<`T`\>

#### Returns

[`GridAsJSON`](../interfaces/GridAsJSON.md)<`T`\>

#### Defined in

[grid/grid.ts:178](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L178)

___

### <a id="toString" name="toString"></a> toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[grid/grid.ts:182](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L182)

___

### <a id="traverse" name="traverse"></a> traverse

**traverse**(`traversers`, `options?`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `traversers` | [`Traverser`](../index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](../index.md#Traverser)<`T`, `T`[]\>[] |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:126](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L126)

**traverse**(`hexes`, `options?`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:127](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L127)

**traverse**(`grid`, `options?`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `grid` | [`Grid`](Grid.md)<`T`\> |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:128](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L128)

**traverse**(`input`, `options?`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Grid`](Grid.md)<`T`\> \| `Iterable`<`T`\> \| [`Traverser`](../index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](../index.md#Traverser)<`T`, `T`[]\>[] |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:129](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L129)

## Properties

### <a id="[toStringTag]" name="[toStringTag]"></a> [toStringTag]

 `Readonly` **[toStringTag]**: ``"Grid"``

#### Defined in

[grid/grid.ts:27](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L27)

___

### <a id="hexPrototype" name="hexPrototype"></a> hexPrototype

 `Readonly` **hexPrototype**: `T`

#### Defined in

[grid/grid.ts:67](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L67)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

**new Grid**<`T`\>(`hexPrototype`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexPrototype` | `T` |

#### Defined in

[grid/grid.ts:71](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L71)

**new Grid**<`T`\>(`hexPrototype`, `traversers`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexPrototype` | `T` |
| `traversers` | [`Traverser`](../index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](../index.md#Traverser)<`T`, `T`[]\>[] |

#### Defined in

[grid/grid.ts:72](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L72)

**new Grid**<`T`\>(`hexPrototype`, `hexes`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexPrototype` | `T` |
| `hexes` | `Iterable`<`T`\> |

#### Defined in

[grid/grid.ts:73](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L73)

**new Grid**<`T`\>(`grid`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `grid` | [`Grid`](Grid.md)<`T`\> |

#### Defined in

[grid/grid.ts:74](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L74)

## Accessors

### <a id="pixelHeight" name="pixelHeight"></a> pixelHeight

`get` **pixelHeight**(): `number`

#### Returns

`number`

#### Defined in

[grid/grid.ts:48](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L48)

___

### <a id="pixelWidth" name="pixelWidth"></a> pixelWidth

`get` **pixelWidth**(): `number`

#### Returns

`number`

#### Defined in

[grid/grid.ts:33](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L33)

___

### <a id="size" name="size"></a> size

`get` **size**(): `number`

#### Returns

`number`

#### Defined in

[grid/grid.ts:29](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L29)
