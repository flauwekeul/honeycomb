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

## Properties

### <a id="size" name="size"></a> size

 `Readonly` **size**: `number`

#### Inherited from

[HexStore](HexStore.md).[size](HexStore.md#size)

#### Defined in

[grid/types.ts:40](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L40)

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

[grid/types.ts:64](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L64)

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

[grid/types.ts:43](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L43)

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

[grid/types.ts:65](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L65)

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

[grid/types.ts:66](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L66)

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

[grid/types.ts:67](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L67)
