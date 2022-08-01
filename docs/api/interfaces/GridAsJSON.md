# Interface: GridAsJSON<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](Hex.md) |

## Table of contents

### Properties

- [coordinates](GridAsJSON.md#coordinates)
- [hexSettings](GridAsJSON.md#hexSettings)

## Properties

### <a id="coordinates" name="coordinates"></a> coordinates

 **coordinates**: [`AxialCoordinates`](AxialCoordinates.md)[]

#### Defined in

[grid/types.ts:13](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L13)

___

### <a id="hexSettings" name="hexSettings"></a> hexSettings

 **hexSettings**: [`HexSettings`](HexSettings.md) & `Omit`<`T`, keyof [`Hex`](Hex.md)\>

#### Defined in

[grid/types.ts:12](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L12)
