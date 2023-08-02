# Interface: HexStore<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](../classes/Hex.md) |

## Hierarchy

- **`HexStore`**

  ↳ [`HexIterable`](HexIterable.md)

  ↳ [`HexTraversable`](HexTraversable.md)

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Defined in

[grid/types.ts:40](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L40)

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

#### Defined in

[grid/types.ts:42](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L42)

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

[grid/types.ts:43](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L43)
