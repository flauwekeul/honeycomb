# API - v4.0.0-alpha.5

## Table of contents

### Coordinates Interfaces

- [AxialCoordinates](interfaces/AxialCoordinates.md)
- [CubeCoordinates](interfaces/CubeCoordinates.md)
- [OffsetCoordinates](interfaces/OffsetCoordinates.md)
- [Point](interfaces/Point.md)

### Hex Interfaces

- [HexOptions](interfaces/HexOptions.md)
- [HexSettings](interfaces/HexSettings.md)

### Traverser Interfaces

- [LineAsVectorOptions](interfaces/LineAsVectorOptions.md)
- [LineBetweenOptions](interfaces/LineBetweenOptions.md)
- [RectangleOptions](interfaces/RectangleOptions.md)
- [RingFromRadiusOptions](interfaces/RingFromRadiusOptions.md)
- [RingOptions](interfaces/RingOptions.md)
- [SpiralOptions](interfaces/SpiralOptions.md)

### Other Interfaces

- [BoundingBox](interfaces/BoundingBox.md)
- [Ellipse](interfaces/Ellipse.md)
- [GridAsJSON](interfaces/GridAsJSON.md)

### Classes

- [Compass](classes/Compass.md)
- [Grid](classes/Grid.md)
- [Hex](classes/Hex.md)

### Hex Enumerations

- [Orientation](enums/Orientation.md)

### Traverser Enumerations

- [Rotation](enums/Rotation.md)

### Other Enumerations

- [CompassDirection](enums/CompassDirection.md)

### Coordinates Type Aliases

- [HexCoordinates](index.md#HexCoordinates)
- [PartialCubeCoordinates](index.md#PartialCubeCoordinates)
- [TupleCoordinates](index.md#TupleCoordinates)

### Hex Type Aliases

- [HexConstructor](index.md#HexConstructor)
- [HexOffset](index.md#HexOffset)

### Traverser Type Aliases

- [RotationLike](index.md#RotationLike)
- [Traverser](index.md#Traverser)

### Other Type Aliases

- [CompassDirectionLike](index.md#CompassDirectionLike)

### Coordinates Functions

- [completeCube](index.md#completeCube)
- [isAxial](index.md#isAxial)
- [isOffset](index.md#isOffset)
- [isTuple](index.md#isTuple)
- [toCube](index.md#toCube)
- [tupleToCube](index.md#tupleToCube)

### Hex Functions

- [createHexDimensions](index.md#createHexDimensions)
- [createHexOrigin](index.md#createHexOrigin)
- [defineHex](index.md#defineHex)
- [equals](index.md#equals)
- [hexToOffset](index.md#hexToOffset)
- [hexToPoint](index.md#hexToPoint)
- [offsetToCube](index.md#offsetToCube)
- [pointToCube](index.md#pointToCube)
- [round](index.md#round)
- [translate](index.md#translate)

### Traverser Functions

- [concat](index.md#concat)
- [fromCoordinates](index.md#fromCoordinates)
- [line](index.md#line)
- [move](index.md#move)
- [rectangle](index.md#rectangle)
- [repeat](index.md#repeat)
- [repeatWith](index.md#repeatWith)
- [ring](index.md#ring)
- [spiral](index.md#spiral)

### Other Functions

- [distance](index.md#distance)
- [isPoint](index.md#isPoint)
- [neighborOf](index.md#neighborOf)
- [offsetFromZero](index.md#offsetFromZero)

### Hex Variables

- [defaultHexSettings](index.md#defaultHexSettings)

## Coordinates Type Aliases

### <a id="HexCoordinates" name="HexCoordinates"></a> HexCoordinates

 **HexCoordinates**: [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) \| [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) \| [`TupleCoordinates`](index.md#TupleCoordinates)

#### Defined in

[hex/types.ts:61](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L61)

___

### <a id="PartialCubeCoordinates" name="PartialCubeCoordinates"></a> PartialCubeCoordinates

 **PartialCubeCoordinates**: { `q?`: `number` ; `r`: `number` ; `s`: `number`  } \| { `q`: `number` ; `r?`: `number` ; `s`: `number`  } \| { `q`: `number` ; `r`: `number` ; `s?`: `number`  }

#### Defined in

[hex/types.ts:48](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L48)

___

### <a id="TupleCoordinates" name="TupleCoordinates"></a> TupleCoordinates

 **TupleCoordinates**: [q: number, r: number, s?: number]

#### Defined in

[hex/types.ts:56](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L56)

___

## Hex Type Aliases

### <a id="HexConstructor" name="HexConstructor"></a> HexConstructor

 **HexConstructor**<`T`\>: (`coordinates?`: [`HexCoordinates`](index.md#HexCoordinates)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Type declaration

(`coordinates?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates?` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Defined in

[hex/types.ts:119](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L119)

___

### <a id="HexOffset" name="HexOffset"></a> HexOffset

 **HexOffset**: ``1`` \| ``-1``

#### Defined in

[hex/types.ts:76](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L76)

___

## Traverser Type Aliases

### <a id="RotationLike" name="RotationLike"></a> RotationLike

 **RotationLike**: [`Rotation`](enums/Rotation.md) \| ``"CLOCKWISE"`` \| ``"clockwise"`` \| ``"COUNTERCLOCKWISE"`` \| ``"counterclockwise"``

#### Defined in

[grid/types.ts:27](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L27)

___

### <a id="Traverser" name="Traverser"></a> Traverser

 **Traverser**<`T`, `R`\>: (`createHex`: (`coordinates?`: [`HexCoordinates`](index.md#HexCoordinates)) => `T`, `cursor?`: [`HexCoordinates`](index.md#HexCoordinates)) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |
| `R` | extends `Iterable`<`T`\> = `T`[] |

#### Type declaration

(`createHex`, `cursor?`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `createHex` | (`coordinates?`: [`HexCoordinates`](index.md#HexCoordinates)) => `T` |
| `cursor?` | [`HexCoordinates`](index.md#HexCoordinates) |

##### Returns

`R`

#### Defined in

[grid/types.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L6)

___

## Other Type Aliases

### <a id="CompassDirectionLike" name="CompassDirectionLike"></a> CompassDirectionLike

 **CompassDirectionLike**: keyof typeof [`CompassDirection`](enums/CompassDirection.md) \| `number`

#### Defined in

[compass/compass.ts:16](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L16)

## Coordinates Functions

### <a id="completeCube" name="completeCube"></a> completeCube

**completeCube**(`__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/completeCube.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/completeCube.ts#L7)

___

### <a id="isAxial" name="isAxial"></a> isAxial

**isAxial**(`value`): value is AxialCoordinates

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is AxialCoordinates

#### Defined in

[utils/isAxial.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isAxial.ts#L8)

___

### <a id="isOffset" name="isOffset"></a> isOffset

**isOffset**(`value`): value is OffsetCoordinates

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is OffsetCoordinates

#### Defined in

[utils/isOffset.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isOffset.ts#L8)

___

### <a id="isTuple" name="isTuple"></a> isTuple

**isTuple**(`value`): value is TupleCoordinates

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is TupleCoordinates

#### Defined in

[utils/isTuple.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isTuple.ts#L7)

___

### <a id="toCube" name="toCube"></a> toCube

**toCube**(`hex`, `coordinates`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

Util for converting offset/axial/cube/tuple coordinates to cube coordinates.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `Pick`<[`Hex`](classes/Hex.md), ``"offset"`` \| ``"isPointy"``\> |
| `coordinates` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/toCube.ts:12](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/toCube.ts#L12)

___

### <a id="tupleToCube" name="tupleToCube"></a> tupleToCube

**tupleToCube**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TupleCoordinates`](index.md#TupleCoordinates) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `q` | `number` |
| `r` | `number` |
| `s` | `number` |

#### Defined in

[utils/tupleToCube.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/tupleToCube.ts#L6)

___

## Hex Functions

### <a id="createHexDimensions" name="createHexDimensions"></a> createHexDimensions

**createHexDimensions**(`radius`): [`Ellipse`](interfaces/Ellipse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `radius` | `number` |

#### Returns

[`Ellipse`](interfaces/Ellipse.md)

#### Defined in

[hex/functions/createHexDimensions.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexDimensions.ts#L7)

**createHexDimensions**(`boundingBox`, `orientation`): [`Ellipse`](interfaces/Ellipse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `boundingBox` | [`BoundingBox`](interfaces/BoundingBox.md) |
| `orientation` | [`Orientation`](enums/Orientation.md) |

#### Returns

[`Ellipse`](interfaces/Ellipse.md)

#### Defined in

[hex/functions/createHexDimensions.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexDimensions.ts#L8)

**createHexDimensions**(`ellipse`): [`Ellipse`](interfaces/Ellipse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ellipse` | [`Ellipse`](interfaces/Ellipse.md) |

#### Returns

[`Ellipse`](interfaces/Ellipse.md)

#### Defined in

[hex/functions/createHexDimensions.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexDimensions.ts#L9)

___

### <a id="createHexOrigin" name="createHexOrigin"></a> createHexOrigin

**createHexOrigin**(`input`, `boundingBox`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | ``"topLeft"`` |
| `boundingBox` | [`BoundingBox`](interfaces/BoundingBox.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/createHexOrigin.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexOrigin.ts#L7)

**createHexOrigin**(`input`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Point`](interfaces/Point.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/createHexOrigin.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexOrigin.ts#L8)

___

### <a id="defineHex" name="defineHex"></a> defineHex

**defineHex**(`hexOptions?`): typeof [`Hex`](classes/Hex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexOptions?` | `Partial`<[`HexOptions`](interfaces/HexOptions.md)\> |

#### Returns

typeof [`Hex`](classes/Hex.md)

#### Defined in

[hex/functions/defineHex.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/defineHex.ts#L9)

___

### <a id="equals" name="equals"></a> equals

**equals**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) \| [`TupleCoordinates`](index.md#TupleCoordinates) |
| `b` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) \| [`TupleCoordinates`](index.md#TupleCoordinates) |

#### Returns

`boolean`

#### Defined in

[hex/functions/equals.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/equals.ts#L7)

**equals**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |
| `b` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |

#### Returns

`boolean`

#### Defined in

[hex/functions/equals.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/equals.ts#L11)

___

### <a id="hexToOffset" name="hexToOffset"></a> hexToOffset

**hexToOffset**(`__namedParameters`): [`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`Hex`](classes/Hex.md), ``"q"`` \| ``"r"`` \| ``"offset"`` \| ``"isPointy"``\> |

#### Returns

[`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Defined in

[hex/functions/hexToOffset.ts:18](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToOffset.ts#L18)

___

### <a id="hexToPoint" name="hexToPoint"></a> hexToPoint

**hexToPoint**(`__namedParameters`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Hex`](classes/Hex.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/hexToPoint.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToPoint.ts#L7)

___

### <a id="offsetToCube" name="offsetToCube"></a> offsetToCube

**offsetToCube**(`__namedParameters`, `__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`Hex`](classes/Hex.md), ``"offset"`` \| ``"isPointy"``\> |
| `__namedParameters` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/offsetToCube.ts:28](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/offsetToCube.ts#L28)

___

### <a id="pointToCube" name="pointToCube"></a> pointToCube

**pointToCube**(`__namedParameters`, `__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`Hex`](classes/Hex.md), ``"isPointy"`` \| ``"dimensions"`` \| ``"origin"``\> |
| `__namedParameters` | [`Point`](interfaces/Point.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/pointToCube.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/pointToCube.ts#L11)

___

### <a id="round" name="round"></a> round

**round**(`coordinates`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/round.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/round.ts#L7)

___

### <a id="translate" name="translate"></a> translate

**translate**<`T`\>(`hex`, `delta`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `delta` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

`T`

#### Defined in

[hex/functions/translate.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/translate.ts#L8)

**translate**(`coordinates`, `delta`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |
| `delta` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/translate.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/translate.ts#L9)

___

## Traverser Functions

### <a id="concat" name="concat"></a> concat

**concat**<`T`\>(`traversers`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `traversers` | [`Traverser`](index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](index.md#Traverser)<`T`, `T`[]\>[] |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/concat.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/concat.ts#L7)

___

### <a id="fromCoordinates" name="fromCoordinates"></a> fromCoordinates

**fromCoordinates**<`T`\>(...`coordinates`): [`Traverser`](index.md#Traverser)<`T`, `T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...coordinates` | [`HexCoordinates`](index.md#HexCoordinates)[] |

#### Returns

[`Traverser`](index.md#Traverser)<`T`, `T`[]\>

#### Defined in

[grid/traversers/fromCoordinates.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/fromCoordinates.ts#L8)

___

### <a id="line" name="line"></a> line

**line**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LineAsVectorOptions`](interfaces/LineAsVectorOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/line.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/line.ts#L9)

**line**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LineBetweenOptions`](interfaces/LineBetweenOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/line.ts:10](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/line.ts#L10)

___

### <a id="move" name="move"></a> move

**move**<`T`\>(`direction`): [`Traverser`](index.md#Traverser)<`T`, `T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | [`CompassDirection`](enums/CompassDirection.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`, `T`[]\>

#### Defined in

[grid/traversers/move.ts:10](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/move.ts#L10)

___

### <a id="rectangle" name="rectangle"></a> rectangle

**rectangle**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

**`Remarks`**

The rectangle will only have 90° corners for the directions North, East, South and West.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RectangleOptions`](interfaces/RectangleOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/rectangle.ts:15](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/rectangle.ts#L15)

**rectangle**<`T`\>(`cornerA`, `cornerB`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cornerA` | [`HexCoordinates`](index.md#HexCoordinates) |
| `cornerB` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/rectangle.ts:16](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/rectangle.ts#L16)

___

### <a id="repeat" name="repeat"></a> repeat

**repeat**<`T`\>(`times`, `traversers`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `times` | `number` |
| `traversers` | [`Traverser`](index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](index.md#Traverser)<`T`, `T`[]\>[] |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/repeat.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/repeat.ts#L8)

___

### <a id="repeatWith" name="repeatWith"></a> repeatWith

**repeatWith**<`T`\>(`sources`, `targets`, `__namedParameters?`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [`Traverser`](index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](index.md#Traverser)<`T`, `T`[]\>[] |
| `targets` | [`Traverser`](index.md#Traverser)<`T`, `T`[]\> \| [`Traverser`](index.md#Traverser)<`T`, `T`[]\>[] |
| `__namedParameters` | `Object` |
| `__namedParameters.includeSource` | `undefined` \| `boolean` |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/repeatWith.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/repeatWith.ts#L9)

___

### <a id="ring" name="ring"></a> ring

**ring**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RingOptions`](interfaces/RingOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/ring.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/ring.ts#L9)

**ring**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RingFromRadiusOptions`](interfaces/RingFromRadiusOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/ring.ts:10](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/ring.ts#L10)

___

### <a id="spiral" name="spiral"></a> spiral

**spiral**<`T`\>(`__namedParameters`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SpiralOptions`](interfaces/SpiralOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/spiral.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/spiral.ts#L11)

___

## Other Functions

### <a id="distance" name="distance"></a> distance

**distance**(`hex`, `from`, `to`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `Pick`<[`Hex`](classes/Hex.md), ``"offset"`` \| ``"isPointy"``\> |
| `from` | [`HexCoordinates`](index.md#HexCoordinates) |
| `to` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

`number`

#### Defined in

[grid/functions/distance.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/functions/distance.ts#L3)

___

### <a id="isPoint" name="isPoint"></a> isPoint

**isPoint**(`value`): value is Point

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Point

#### Defined in

[utils/isPoint.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isPoint.ts#L5)

___

### <a id="neighborOf" name="neighborOf"></a> neighborOf

**neighborOf**<`T`\>(`hex`, `direction`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `direction` | [`CompassDirection`](enums/CompassDirection.md) |

#### Returns

`T`

#### Defined in

[grid/functions/neighborOf.ts:50](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/functions/neighborOf.ts#L50)

___

### <a id="offsetFromZero" name="offsetFromZero"></a> offsetFromZero

**offsetFromZero**(`offset`, `distance`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | [`HexOffset`](index.md#HexOffset) |
| `distance` | `number` |

#### Returns

`number`

#### Defined in

[utils/offsetFromZero.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/offsetFromZero.ts#L6)

## Hex Variables

### <a id="defaultHexSettings" name="defaultHexSettings"></a> defaultHexSettings

 `Const` **defaultHexSettings**: [`HexSettings`](interfaces/HexSettings.md)

#### Defined in

[hex/hex.ts:123](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/hex.ts#L123)
