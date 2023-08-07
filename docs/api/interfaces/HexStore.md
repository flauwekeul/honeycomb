# Interface: HexStore<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../classes/Hex.md) |

## Hierarchy

- **`HexStore`**

  ↳ [`HexIterable`](HexIterable.md)

  ↳ [`HexTraversable`](HexTraversable.md)

## Table of contents

### Properties

- [size](HexStore.md#size)

### Methods

- [getHex](HexStore.md#getHex)
- [hasHex](HexStore.md#hasHex)
- [setHexes](HexStore.md#setHexes)

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Defined in

[grid/types.ts:36](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L36)

## Methods

### <a id="getHex" name="getHex"></a> getHex

**getHex**(`coordinates`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`undefined` \| `T`

#### Defined in

[grid/types.ts:37](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L37)

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

[grid/types.ts:38](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L38)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexesOrCoordinates`): [`HexStore`](HexStore.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexesOrCoordinates` | `Iterable`<[`HexCoordinates`](../index.md#HexCoordinates) \| `T`\> |

#### Returns

[`HexStore`](HexStore.md)<`T`\>

#### Defined in

[grid/types.ts:39](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L39)
