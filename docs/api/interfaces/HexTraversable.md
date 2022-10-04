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

[grid/types.ts:69](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L69)

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

[grid/types.ts:46](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L46)

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

[grid/types.ts:47](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L47)

___

### <a id="setHexes" name="setHexes"></a> setHexes

**setHexes**(`hexesOrCoordinates`): [`HexTraversable`](HexTraversable.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexesOrCoordinates` | `Iterable`<[`HexCoordinates`](../index.md#HexCoordinates) \| `T`\> |

#### Returns

[`HexTraversable`](HexTraversable.md)<`T`\>

#### Inherited from

[HexStore](HexStore.md).[setHexes](HexStore.md#setHexes)

#### Defined in

[grid/types.ts:48](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L48)

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

[grid/types.ts:70](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L70)

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

[grid/types.ts:71](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L71)

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

[grid/types.ts:72](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L72)

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Inherited from

[HexStore](HexStore.md).[size](HexStore.md#size)

#### Defined in

[grid/types.ts:45](https://github.com/flauwekeul/honeycomb/blob/beta/src/grid/types.ts#L45)
