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

- [size](Grid.md#size)

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

**[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Implementation of

Iterable.\_\_@iterator@100

#### Defined in

[grid/grid.ts:33](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L33)

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

[grid/grid.ts:56](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L56)

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

[grid/grid.ts:171](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L171)

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

[grid/grid.ts:172](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L172)

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

[grid/grid.ts:76](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L76)

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

[grid/grid.ts:115](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L115)

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

[grid/grid.ts:60](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L60)

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

[grid/grid.ts:65](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L65)

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

[grid/grid.ts:86](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L86)

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

[grid/grid.ts:185](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L185)

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

[grid/grid.ts:186](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L186)

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

[grid/grid.ts:156](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L156)

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

[grid/grid.ts:157](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L157)

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

[grid/grid.ts:122](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L122)

**reduce**(`reducer`, `initialValue`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |
| `initialValue` | `T` |

#### Returns

`T`

#### Defined in

[grid/grid.ts:123](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L123)

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

[grid/grid.ts:124](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L124)

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

[grid/grid.ts:69](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L69)

___

### <a id="toArray" name="toArray"></a> toArray

**toArray**(): `T`[]

#### Returns

`T`[]

#### Defined in

[grid/grid.ts:144](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L144)

___

### <a id="toJSON" name="toJSON"></a> toJSON

**toJSON**(): [`GridAsJSON`](../interfaces/GridAsJSON.md)<`T`\>

#### Returns

[`GridAsJSON`](../interfaces/GridAsJSON.md)<`T`\>

#### Defined in

[grid/grid.ts:148](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L148)

___

### <a id="toString" name="toString"></a> toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[grid/grid.ts:152](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L152)

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

[grid/grid.ts:96](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L96)

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

[grid/grid.ts:97](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L97)

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

[grid/grid.ts:98](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L98)

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

[grid/grid.ts:99](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L99)

## Properties

### <a id="[toStringTag]" name="[toStringTag]"></a> [toStringTag]

 `Readonly` **[toStringTag]**: ``"Grid"``

#### Defined in

[grid/grid.ts:27](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L27)

___

### <a id="hexPrototype" name="hexPrototype"></a> hexPrototype

 `Readonly` **hexPrototype**: `T`

#### Defined in

[grid/grid.ts:37](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L37)

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

[grid/grid.ts:41](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L41)

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

[grid/grid.ts:42](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L42)

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

[grid/grid.ts:43](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L43)

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

[grid/grid.ts:44](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L44)

## Accessors

### <a id="size" name="size"></a> size

`get` **size**(): `number`

#### Returns

`number`

#### Defined in

[grid/grid.ts:29](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/grid.ts#L29)
