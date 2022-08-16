# Interface: HexTraversable<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../classes/Hex.md) |

## Hierarchy

- [`HexStore`](HexStore.md)<`T`\>

  ↳ **`HexTraversable`**

## Implemented by

- [`Grid`](../classes/Grid.md)

## Table of contents

### Methods

- [createHex](HexTraversable.md#createHex)
- [getHex](HexTraversable.md#getHex)
- [hasHex](HexTraversable.md#hasHex)
- [setHexes](HexTraversable.md#setHexes)
- [traverse](HexTraversable.md#traverse)

### Properties

- [size](HexTraversable.md#size)

## Methods

### <a id="createHex" name="createHex"></a> createHex

**createHex**(`coordinates?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates?` | [`HexCoordinates`](../index.md#HexCoordinates) |

#### Returns

`T`

#### Defined in

[grid/types.ts:74](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L74)

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

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexes`): [`HexTraversable`](HexTraversable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |

#### Returns

[`HexTraversable`](HexTraversable.md)<`T`\>

#### Inherited from

[HexStore](HexStore.md).[setHexes](HexStore.md#setHexes)

#### Defined in

[grid/types.ts:53](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L53)

___

### <a id="traverse" name="traverse"></a> traverse

**traverse**(`traversers`, `options?`): [`HexTraversable`](HexTraversable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `traversers` | [`Traverser`](../index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](../index.md#Traverser)<`T`, `T`[]\>[] |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`HexTraversable`](HexTraversable.md)<`T`\>

#### Defined in

[grid/types.ts:75](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L75)

**traverse**(`hexes`, `options?`): [`HexTraversable`](HexTraversable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexes` | `Iterable`<`T`\> |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`HexTraversable`](HexTraversable.md)<`T`\>

#### Defined in

[grid/types.ts:76](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L76)

**traverse**(`grid`, `options?`): [`HexTraversable`](HexTraversable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `grid` | [`HexTraversable`](HexTraversable.md)<`T`\> |
| `options?` | `Object` |
| `options.bail?` | `boolean` |

#### Returns

[`HexTraversable`](HexTraversable.md)<`T`\>

#### Defined in

[grid/types.ts:77](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L77)

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Inherited from

[HexStore](HexStore.md).[size](HexStore.md#size)

#### Defined in

[grid/types.ts:50](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L50)
