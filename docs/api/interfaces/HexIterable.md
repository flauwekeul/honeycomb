# Interface: HexIterable<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../classes/Hex.md) |

## Hierarchy

- `Iterable`<`T`\>

- [`HexStore`](HexStore.md)<`T`\>

  ↳ **`HexIterable`**

## Implemented by

- [`Grid`](../classes/Grid.md)

## Table of contents

### Methods

- [[iterator]](HexIterable.md#[iterator])
- [filter](HexIterable.md#filter)
- [forEach](HexIterable.md#forEach)
- [getHex](HexIterable.md#getHex)
- [hasHex](HexIterable.md#hasHex)
- [map](HexIterable.md#map)
- [reduce](HexIterable.md#reduce)
- [setHexes](HexIterable.md#setHexes)
- [toArray](HexIterable.md#toArray)

### Properties

- [size](HexIterable.md#size)

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

**[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Overrides

Iterable.\_\_@iterator@103

#### Defined in

[grid/types.ts:60](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L60)

___

### <a id="filter" name="filter"></a> filter

**filter**(`predicate`): [`HexIterable`](HexIterable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`hex`: `T`) => `boolean` |

#### Returns

[`HexIterable`](HexIterable.md)<`T`\>

#### Defined in

[grid/types.ts:61](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L61)

___

### <a id="forEach" name="forEach"></a> forEach

**forEach**(`fn`): [`HexIterable`](HexIterable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hex`: `T`) => `void` |

#### Returns

[`HexIterable`](HexIterable.md)<`T`\>

#### Defined in

[grid/types.ts:63](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L63)

___

### <a id="getHex" name="getHex"></a> getHex

**getHex**(`coordinates`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`undefined` \| `T`

#### Inherited from

[HexStore](HexStore.md).[getHex](HexStore.md#getHex)

#### Defined in

[grid/types.ts:51](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L51)

___

### <a id="hasHex" name="hasHex"></a> hasHex

**hasHex**(`hex`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |

#### Returns

`boolean`

#### Inherited from

[HexStore](HexStore.md).[hasHex](HexStore.md#hasHex)

#### Defined in

[grid/types.ts:52](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L52)

___

### <a id="map" name="map"></a> map

**map**(`fn`): [`HexIterable`](HexIterable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`hex`: `T`) => `T` |

#### Returns

[`HexIterable`](HexIterable.md)<`T`\>

#### Defined in

[grid/types.ts:62](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L62)

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

[grid/types.ts:64](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L64)

**reduce**(`reducer`, `initialValue`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |
| `initialValue` | `T` |

#### Returns

`T`

#### Defined in

[grid/types.ts:65](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L65)

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

[grid/types.ts:66](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L66)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexes`): [`HexIterable`](HexIterable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |

#### Returns

[`HexIterable`](HexIterable.md)<`T`\>

#### Inherited from

[HexStore](HexStore.md).[setHexes](HexStore.md#setHexes)

#### Defined in

[grid/types.ts:53](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L53)

___

### <a id="toArray" name="toArray"></a> toArray

**toArray**(): `T`[]

#### Returns

`T`[]

#### Defined in

[grid/types.ts:67](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L67)

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Inherited from

[HexStore](HexStore.md).[size](HexStore.md#size)

#### Defined in

[grid/types.ts:50](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L50)
