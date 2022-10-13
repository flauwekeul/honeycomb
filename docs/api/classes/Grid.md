# Class: Grid<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md) |

## Implements

- [`HexIterable`](../interfaces/HexIterable.md)<`T`\>
- [`HexTraversable`](../interfaces/HexTraversable.md)<`T`\>

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

### Constructors

- [constructor](Grid.md#constructor)

### Accessors

- [hexPrototype](Grid.md#hexPrototype)
- [pixelHeight](Grid.md#pixelHeight)
- [pixelWidth](Grid.md#pixelWidth)
- [size](Grid.md#size)

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

**[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[[iterator]](../interfaces/HexIterable.md#[iterator])

#### Defined in

[grid/grid.ts:60](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L60)

___

### <a id="createHex" name="createHex"></a> createHex

**createHex**(`coordinates?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates?` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`T`

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[createHex](../interfaces/HexTraversable.md#createHex)

#### Defined in

[grid/grid.ts:90](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L90)

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

[grid/grid.ts:206](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L206)

**distance**(`from`, `to`, `options`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `to` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `options` | `Object` |
| `options.allowOutside` | ``false`` |

#### Returns

`undefined` \| `number`

#### Defined in

[grid/grid.ts:207](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L207)

___

### <a id="filter" name="filter"></a> filter

**filter**(`predicate`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`hex`: `T`) => `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[filter](../interfaces/HexIterable.md#filter)

#### Defined in

[grid/grid.ts:111](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L111)

___

### <a id="forEach" name="forEach"></a> forEach

**forEach**(`fn`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hex`: `T`) => `void` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[forEach](../interfaces/HexIterable.md#forEach)

#### Defined in

[grid/grid.ts:152](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L152)

___

### <a id="fromIterable" name="fromIterable"></a> fromIterable

`Static` **fromIterable**<`T`\>(`hexes`): [`Grid`](Grid.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Defined in

[grid/grid.ts:8](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L8)

___

### <a id="fromJSON" name="fromJSON"></a> fromJSON

`Static` **fromJSON**(`__namedParameters`): [`Grid`](Grid.md)<[`Hex`](Hex.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GridAsJSON`](../interfaces/GridAsJSON.md) |

#### Returns

[`Grid`](Grid.md)<[`Hex`](Hex.md)\>

#### Defined in

[grid/grid.ts:18](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L18)

___

### <a id="getHex" name="getHex"></a> getHex

**getHex**(`coordinates`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`undefined` \| `T`

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[getHex](../interfaces/HexTraversable.md#getHex)

#### Defined in

[grid/grid.ts:94](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L94)

___

### <a id="hasHex" name="hasHex"></a> hasHex

**hasHex**(`hex`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |

#### Returns

`boolean`

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[hasHex](../interfaces/HexTraversable.md#hasHex)

#### Defined in

[grid/grid.ts:99](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L99)

___

### <a id="map" name="map"></a> map

**map**(`fn`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hex`: `T`) => `T` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[map](../interfaces/HexIterable.md#map)

#### Defined in

[grid/grid.ts:121](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L121)

___

### <a id="neighborOf" name="neighborOf"></a> neighborOf

**neighborOf**(`coordinates`, `direction`, `options?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `direction` | [`Direction`](../enums/Direction.md) |
| `options?` | `Object` |
| `options.allowOutside` | ``true`` |

#### Returns

`T`

#### Defined in

[grid/grid.ts:218](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L218)

**neighborOf**(`coordinates`, `direction`, `options`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |
| `direction` | [`Direction`](../enums/Direction.md) |
| `options` | `Object` |
| `options.allowOutside` | ``false`` |

#### Returns

`undefined` \| `T`

#### Defined in

[grid/grid.ts:219](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L219)

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

[grid/grid.ts:197](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L197)

**pointToHex**(`point`, `options`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](../interfaces/Point.md) |
| `options` | `Object` |
| `options.allowOutside` | ``false`` |

#### Returns

`undefined` \| `T`

#### Defined in

[grid/grid.ts:198](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L198)

___

### <a id="reduce" name="reduce"></a> reduce

**reduce**(`reducer`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |

#### Returns

`T`

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[reduce](../interfaces/HexIterable.md#reduce)

#### Defined in

[grid/grid.ts:159](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L159)

**reduce**(`reducer`, `initialValue`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |
| `initialValue` | `T` |

#### Returns

`T`

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[reduce](../interfaces/HexIterable.md#reduce)

#### Defined in

[grid/grid.ts:160](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L160)

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

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[reduce](../interfaces/HexIterable.md#reduce)

#### Defined in

[grid/grid.ts:161](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L161)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexesOrCoordinates`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexesOrCoordinates` | `Iterable`<[`HexCoordinates`](../index.md#HexCoordinates) \| `T`\> |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[setHexes](../interfaces/HexTraversable.md#setHexes)

#### Defined in

[grid/grid.ts:103](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L103)

___

### <a id="toArray" name="toArray"></a> toArray

**toArray**(): `T`[]

#### Returns

`T`[]

#### Implementation of

[HexIterable](../interfaces/HexIterable.md).[toArray](../interfaces/HexIterable.md#toArray)

#### Defined in

[grid/grid.ts:181](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L181)

___

### <a id="toJSON" name="toJSON"></a> toJSON

**toJSON**(): [`GridAsJSON`](../interfaces/GridAsJSON.md)

#### Returns

[`GridAsJSON`](../interfaces/GridAsJSON.md)

#### Defined in

[grid/grid.ts:186](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L186)

___

### <a id="toString" name="toString"></a> toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[grid/grid.ts:193](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L193)

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

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[traverse](../interfaces/HexTraversable.md#traverse)

#### Defined in

[grid/grid.ts:131](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L131)

**traverse**(`hexes`, `options?`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<[`HexCoordinates`](../index.md#HexCoordinates) \| `T`\> |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[traverse](../interfaces/HexTraversable.md#traverse)

#### Defined in

[grid/grid.ts:132](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L132)

**traverse**(`grid`, `options?`): [`Grid`](Grid.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `grid` | [`Grid`](Grid.md)<`T`\> |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`Grid`](Grid.md)<`T`\>

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[traverse](../interfaces/HexTraversable.md#traverse)

#### Defined in

[grid/grid.ts:133](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L133)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

**new Grid**<`T`\>(`hexClass`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexClass` | [`HexConstructor`](../index.md#HexConstructor)<`T`\> |

#### Defined in

[grid/grid.ts:72](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L72)

**new Grid**<`T`\>(`hexClass`, `traversers`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexClass` | [`HexConstructor`](../index.md#HexConstructor)<`T`\> |
| `traversers` | [`Traverser`](../index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](../index.md#Traverser)<`T`, `T`[]\>[] |

#### Defined in

[grid/grid.ts:73](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L73)

**new Grid**<`T`\>(`hexClass`, `hexes`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexClass` | [`HexConstructor`](../index.md#HexConstructor)<`T`\> |
| `hexes` | `Iterable`<[`HexCoordinates`](../index.md#HexCoordinates) \| `T`\> |

#### Defined in

[grid/grid.ts:74](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L74)

**new Grid**<`T`\>(`grid`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `grid` | [`Grid`](Grid.md)<`T`\> |

#### Defined in

[grid/grid.ts:75](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L75)

## Accessors

### <a id="hexPrototype" name="hexPrototype"></a> hexPrototype

`get` **hexPrototype**(): `T`

#### Returns

`T`

#### Defined in

[grid/grid.ts:64](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L64)

___

### <a id="pixelHeight" name="pixelHeight"></a> pixelHeight

`get` **pixelHeight**(): `number`

#### Returns

`number`

#### Defined in

[grid/grid.ts:45](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L45)

___

### <a id="pixelWidth" name="pixelWidth"></a> pixelWidth

`get` **pixelWidth**(): `number`

#### Returns

`number`

#### Defined in

[grid/grid.ts:30](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L30)

___

### <a id="size" name="size"></a> size

`get` **size**(): `number`

#### Returns

`number`

#### Implementation of

[HexTraversable](../interfaces/HexTraversable.md).[size](../interfaces/HexTraversable.md#size)

#### Defined in

[grid/grid.ts:26](https://github.com/flauwekeul/honeycomb/blob/d2d905f/src/grid/grid.ts#L26)
