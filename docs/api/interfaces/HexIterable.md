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

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Inherited from

[HexStore](HexStore.md).[size](HexStore.md#size)

#### Defined in

[grid/types.ts:40](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L40)

## Methods

### <a id="[iterator]" name="[iterator]"></a> [iterator]

**[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Overrides

Iterable.[iterator]

#### Defined in

[grid/types.ts:50](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L50)

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

[grid/types.ts:51](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L51)

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

[grid/types.ts:53](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L53)

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

[grid/types.ts:41](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L41)

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

[grid/types.ts:42](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L42)

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

[grid/types.ts:52](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L52)

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

[grid/types.ts:54](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L54)

**reduce**(`reducer`, `initialValue`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | (`previousHex`: `T`, `currentHex`: `T`) => `T` |
| `initialValue` | `T` |

#### Returns

`T`

#### Defined in

[grid/types.ts:55](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L55)

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

[grid/types.ts:56](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L56)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexesOrCoordinates`): [`HexIterable`](HexIterable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexesOrCoordinates` | `Iterable`<[`HexCoordinates`](../index.md#HexCoordinates) \| `T`\> |

#### Returns

[`HexIterable`](HexIterable.md)<`T`\>

#### Inherited from

[HexStore](HexStore.md).[setHexes](HexStore.md#setHexes)

#### Defined in

[grid/types.ts:43](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L43)

___

### <a id="toArray" name="toArray"></a> toArray

**toArray**(): `T`[]

#### Returns

`T`[]

#### Defined in

[grid/types.ts:57](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L57)
