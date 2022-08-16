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

### Methods

- [getHex](HexStore.md#getHex)
- [hasHex](HexStore.md#hasHex)
- [setHexes](HexStore.md#setHexes)

### Properties

- [size](HexStore.md#size)

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

#### Defined in

[grid/types.ts:52](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L52)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexes`): [`HexStore`](HexStore.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |

#### Returns

[`HexStore`](HexStore.md)<`T`\>

#### Defined in

[grid/types.ts:53](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L53)

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Defined in

[grid/types.ts:50](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L50)
