# API - v4.1.4

## Classes

- [Grid](classes/Grid.md)
- [Hex](classes/Hex.md)

## Coordinates Interfaces

- [AxialCoordinates](interfaces/AxialCoordinates.md)
- [CubeCoordinates](interfaces/CubeCoordinates.md)
- [OffsetCoordinates](interfaces/OffsetCoordinates.md)
- [Point](interfaces/Point.md)

## Hex Interfaces

- [HexOptions](interfaces/HexOptions.md)
- [HexSettings](interfaces/HexSettings.md)

## Grid Interfaces

- [GridAsJSON](interfaces/GridAsJSON.md)
- [HexIterable](interfaces/HexIterable.md)
- [HexStore](interfaces/HexStore.md)
- [HexTraversable](interfaces/HexTraversable.md)

## Traverser Interfaces

- [LineAsVectorOptions](interfaces/LineAsVectorOptions.md)
- [LineBetweenOptions](interfaces/LineBetweenOptions.md)
- [RectangleOptions](interfaces/RectangleOptions.md)
- [RingFromRadiusOptions](interfaces/RingFromRadiusOptions.md)
- [RingOptions](interfaces/RingOptions.md)
- [SpiralOptions](interfaces/SpiralOptions.md)

## Other Interfaces

- [BoundingBox](interfaces/BoundingBox.md)
- [Ellipse](interfaces/Ellipse.md)

## Coordinates Type Aliases

- [HexCoordinates](index.md#HexCoordinates)
- [PartialCubeCoordinates](index.md#PartialCubeCoordinates)
- [TupleCoordinates](index.md#TupleCoordinates)

## Hex Type Aliases

- [HexConstructor](index.md#HexConstructor)
- [HexOffset](index.md#HexOffset)
- [Orientation](index.md#Orientation)

## Grid Type Aliases

- [Direction](index.md#Direction)

## Traverser Type Aliases

- [Rotation](index.md#Rotation)
- [Traverser](index.md#Traverser)

## Util Type Aliases

- [UnknownFunction](index.md#UnknownFunction)

## Hex Variables

- [defaultHexSettings](index.md#defaultHexSettings)

## Grid Variables

- [DIRECTIONS](index.md#DIRECTIONS)

## Coordinates Functions

- [completeCube](index.md#completeCube)
- [isAxial](index.md#isAxial)
- [isOffset](index.md#isOffset)
- [isPoint](index.md#isPoint)
- [isTuple](index.md#isTuple)
- [toCube](index.md#toCube)
- [tupleToCube](index.md#tupleToCube)

## Hex Functions

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

## Traverser Functions

- [concat](index.md#concat)
- [fromCoordinates](index.md#fromCoordinates)
- [line](index.md#line)
- [move](index.md#move)
- [rectangle](index.md#rectangle)
- [repeat](index.md#repeat)
- [repeatWith](index.md#repeatWith)
- [ring](index.md#ring)
- [spiral](index.md#spiral)

## Other Functions

- [distance](index.md#distance)
- [neighborOf](index.md#neighborOf)

## Util Functions

- [isFunction](index.md#isFunction)
- [isNumber](index.md#isNumber)
- [isObject](index.md#isObject)
- [rotate](index.md#rotate)
- [signedModulo](index.md#signedModulo)

## Coordinates Type Aliases

### <a id="HexCoordinates" name="HexCoordinates"></a> HexCoordinates

 **HexCoordinates**: [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) \| [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) \| [`TupleCoordinates`](index.md#TupleCoordinates)

#### Defined in

[hex/types.ts:58](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L58)

___

### <a id="PartialCubeCoordinates" name="PartialCubeCoordinates"></a> PartialCubeCoordinates

 **PartialCubeCoordinates**: { `q?`: `number` ; `r`: `number` ; `s`: `number`  } \| { `q`: `number` ; `r?`: `number` ; `s`: `number`  } \| { `q`: `number` ; `r`: `number` ; `s?`: `number`  }

#### Defined in

[hex/types.ts:45](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L45)

___

### <a id="TupleCoordinates" name="TupleCoordinates"></a> TupleCoordinates

 **TupleCoordinates**: [q: number, r: number, s?: number]

#### Defined in

[hex/types.ts:53](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L53)

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

[hex/types.ts:116](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L116)

___

### <a id="HexOffset" name="HexOffset"></a> HexOffset

 **HexOffset**: ``1`` \| ``-1``

#### Defined in

[hex/types.ts:73](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L73)

___

### <a id="Orientation" name="Orientation"></a> Orientation

 **Orientation**: ``"pointy"`` \| ``"flat"``

#### Defined in

[hex/types.ts:14](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/types.ts#L14)

___

## Grid Type Aliases

### <a id="Direction" name="Direction"></a> Direction

 **Direction**: typeof [`DIRECTIONS`](index.md#DIRECTIONS)[`number`]

#### Defined in

[grid/types.ts:34](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L34)

___

## Traverser Type Aliases

### <a id="Rotation" name="Rotation"></a> Rotation

 **Rotation**: ``"cw"`` \| ``"ccw"``

'cw' for clockwise and 'ccw' for counterclockwise

#### Defined in

[grid/types.ts:16](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L16)

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

[grid/types.ts:6](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L6)

___

## Util Type Aliases

### <a id="UnknownFunction" name="UnknownFunction"></a> UnknownFunction

 **UnknownFunction**: (...`args`: `unknown`[]) => `unknown`

#### Type declaration

(`...args`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

##### Returns

`unknown`

#### Defined in

[utils/isFunction.ts:4](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isFunction.ts#L4)

## Hex Variables

### <a id="defaultHexSettings" name="defaultHexSettings"></a> defaultHexSettings

 `Const` **defaultHexSettings**: [`HexSettings`](interfaces/HexSettings.md)

#### Defined in

[hex/hex.ts:133](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L133)

___

## Grid Variables

### <a id="DIRECTIONS" name="DIRECTIONS"></a> DIRECTIONS

 `Const` **DIRECTIONS**: readonly [``"N"``, ``"NE"``, ``"E"``, ``"SE"``, ``"S"``, ``"SW"``, ``"W"``, ``"NW"``]

#### Defined in

[grid/types.ts:29](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L29)

## Coordinates Functions

### <a id="completeCube" name="completeCube"></a> completeCube

**completeCube**(`«destructured»`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/completeCube.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/completeCube.ts#L7)

___

### <a id="isAxial" name="isAxial"></a> isAxial

**isAxial**(`value`): value is AxialCoordinates

Determines whether the passed value is an object with axial coordinates, e.g.: `{ q: 1, r: 2 }`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is AxialCoordinates

#### Defined in

[utils/isAxial.ts:10](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isAxial.ts#L10)

___

### <a id="isOffset" name="isOffset"></a> isOffset

**isOffset**(`value`): value is OffsetCoordinates

Determines whether the passed value is an object with offset coordinates, e.g.: `{ col: 1, row: 2 }`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is OffsetCoordinates

#### Defined in

[utils/isOffset.ts:10](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isOffset.ts#L10)

___

### <a id="isPoint" name="isPoint"></a> isPoint

**isPoint**(`value`): value is Point

Determines whether the passed value is an object with point coordinates, e.g.: `{ x: 1, y: 2 }`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Point

#### Defined in

[utils/isPoint.ts:10](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isPoint.ts#L10)

___

### <a id="isTuple" name="isTuple"></a> isTuple

**isTuple**(`value`): value is TupleCoordinates

Determines whether the passed value are tuple coordinates (an array containing exactly 2 numbers), e.g.: `[1, 2]`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is TupleCoordinates

#### Defined in

[utils/isTuple.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isTuple.ts#L9)

___

### <a id="toCube" name="toCube"></a> toCube

**toCube**(`hexSettings`, `coordinates`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

Util for converting offset/axial/cube/tuple coordinates to cube coordinates.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexSettings` | `Pick`<[`HexSettings`](interfaces/HexSettings.md), ``"orientation"`` \| ``"offset"``\> |
| `coordinates` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/toCube.ts:14](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/toCube.ts#L14)

___

### <a id="tupleToCube" name="tupleToCube"></a> tupleToCube

**tupleToCube**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`TupleCoordinates`](index.md#TupleCoordinates) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `q` | `number` |
| `r` | `number` |
| `s` | `number` |

#### Defined in

[utils/tupleToCube.ts:6](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/tupleToCube.ts#L6)

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

[hex/functions/createHexDimensions.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/createHexDimensions.ts#L7)

**createHexDimensions**(`boundingBox`, `orientation`): [`Ellipse`](interfaces/Ellipse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `boundingBox` | [`BoundingBox`](interfaces/BoundingBox.md) |
| `orientation` | [`Orientation`](index.md#Orientation) |

#### Returns

[`Ellipse`](interfaces/Ellipse.md)

#### Defined in

[hex/functions/createHexDimensions.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/createHexDimensions.ts#L8)

**createHexDimensions**(`ellipse`): [`Ellipse`](interfaces/Ellipse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ellipse` | [`Ellipse`](interfaces/Ellipse.md) |

#### Returns

[`Ellipse`](interfaces/Ellipse.md)

#### Defined in

[hex/functions/createHexDimensions.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/createHexDimensions.ts#L9)

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

[hex/functions/createHexOrigin.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/createHexOrigin.ts#L7)

**createHexOrigin**(`input`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Point`](interfaces/Point.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/createHexOrigin.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/createHexOrigin.ts#L8)

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

[hex/functions/defineHex.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/defineHex.ts#L9)

___

### <a id="equals" name="equals"></a> equals

**equals**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`TupleCoordinates`](index.md#TupleCoordinates) \| [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |
| `b` | [`TupleCoordinates`](index.md#TupleCoordinates) \| [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

`boolean`

#### Defined in

[hex/functions/equals.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/equals.ts#L7)

**equals**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |
| `b` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |

#### Returns

`boolean`

#### Defined in

[hex/functions/equals.ts:11](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/equals.ts#L11)

___

### <a id="hexToOffset" name="hexToOffset"></a> hexToOffset

**hexToOffset**(`«destructured»`): [`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Pick`<[`Hex`](classes/Hex.md), ``"q"`` \| ``"r"`` \| ``"offset"`` \| ``"isPointy"``\> |

#### Returns

[`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Defined in

[hex/functions/hexToOffset.ts:18](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/hexToOffset.ts#L18)

___

### <a id="hexToPoint" name="hexToPoint"></a> hexToPoint

**hexToPoint**(`«destructured»`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Hex`](classes/Hex.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/hexToPoint.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/hexToPoint.ts#L7)

___

### <a id="offsetToCube" name="offsetToCube"></a> offsetToCube

**offsetToCube**(`«destructured»`, `«destructured»`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Pick`<[`HexSettings`](interfaces/HexSettings.md), ``"orientation"`` \| ``"offset"``\> |
| `«destructured»` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/offsetToCube.ts:27](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/offsetToCube.ts#L27)

___

### <a id="pointToCube" name="pointToCube"></a> pointToCube

**pointToCube**(`«destructured»`, `«destructured»`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Pick`<[`HexSettings`](interfaces/HexSettings.md), ``"dimensions"`` \| ``"orientation"`` \| ``"origin"``\> |
| `«destructured»` | [`Point`](interfaces/Point.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/pointToCube.ts:10](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/pointToCube.ts#L10)

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

[hex/functions/round.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/round.ts#L7)

___

### <a id="translate" name="translate"></a> translate

**translate**<`T`\>(`hex`, `delta`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `delta` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

`T`

#### Defined in

[hex/functions/translate.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/translate.ts#L8)

**translate**(`coordinates`, `delta`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |
| `delta` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/translate.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/translate.ts#L9)

___

## Traverser Functions

### <a id="concat" name="concat"></a> concat

**concat**<`T`\>(`traversers`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `traversers` | [`Traverser`](index.md#Traverser)<`T`\> \| [`Traverser`](index.md#Traverser)<`T`\>[] |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/concat.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/concat.ts#L7)

___

### <a id="fromCoordinates" name="fromCoordinates"></a> fromCoordinates

**fromCoordinates**<`T`\>(`...coordinates`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...coordinates` | [`HexCoordinates`](index.md#HexCoordinates)[] |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/fromCoordinates.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/fromCoordinates.ts#L8)

___

### <a id="line" name="line"></a> line

**line**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LineAsVectorOptions`](interfaces/LineAsVectorOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/line.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/line.ts#L8)

**line**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LineBetweenOptions`](interfaces/LineBetweenOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/line.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/line.ts#L9)

___

### <a id="move" name="move"></a> move

**move**<`T`\>(`direction`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | ``"N"`` \| ``"NE"`` \| ``"E"`` \| ``"SE"`` \| ``"S"`` \| ``"SW"`` \| ``"W"`` \| ``"NW"`` |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/move.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/move.ts#L9)

___

### <a id="rectangle" name="rectangle"></a> rectangle

**rectangle**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RectangleOptions`](interfaces/RectangleOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

**`Remarks`**

The rectangle will only have 90° corners for the directions North, East, South and West.

#### Defined in

[grid/traversers/rectangle.ts:14](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/rectangle.ts#L14)

**rectangle**<`T`\>(`cornerA`, `cornerB`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cornerA` | [`HexCoordinates`](index.md#HexCoordinates) |
| `cornerB` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/rectangle.ts:15](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/rectangle.ts#L15)

___

### <a id="repeat" name="repeat"></a> repeat

**repeat**<`T`\>(`times`, `traversers`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `times` | `number` |
| `traversers` | [`Traverser`](index.md#Traverser)<`T`\> \| [`Traverser`](index.md#Traverser)<`T`\>[] |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/repeat.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/repeat.ts#L8)

___

### <a id="repeatWith" name="repeatWith"></a> repeatWith

**repeatWith**<`T`\>(`sources`, `branches`, `«destructured»?`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [`Traverser`](index.md#Traverser)<`T`\> \| [`Traverser`](index.md#Traverser)<`T`\>[] |
| `branches` | [`Traverser`](index.md#Traverser)<`T`\> \| [`Traverser`](index.md#Traverser)<`T`\>[] |
| `«destructured»` | `Object` |
| › `includeSource` | `undefined` \| `boolean` |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/repeatWith.ts:8](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/repeatWith.ts#L8)

___

### <a id="ring" name="ring"></a> ring

**ring**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RingOptions`](interfaces/RingOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/ring.ts:9](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/ring.ts#L9)

**ring**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RingFromRadiusOptions`](interfaces/RingFromRadiusOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/ring.ts:10](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/ring.ts#L10)

___

### <a id="spiral" name="spiral"></a> spiral

**spiral**<`T`\>(`«destructured»`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`SpiralOptions`](interfaces/SpiralOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/spiral.ts:10](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/traversers/spiral.ts#L10)

___

## Other Functions

### <a id="distance" name="distance"></a> distance

**distance**(`hexSettings`, `from`, `to`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexSettings` | `Pick`<[`HexSettings`](interfaces/HexSettings.md), ``"orientation"`` \| ``"offset"``\> |
| `from` | [`HexCoordinates`](index.md#HexCoordinates) |
| `to` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

`number`

#### Defined in

[grid/functions/distance.ts:3](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/functions/distance.ts#L3)

___

### <a id="neighborOf" name="neighborOf"></a> neighborOf

**neighborOf**<`T`\>(`hex`, `direction`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](classes/Hex.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `direction` | ``"N"`` \| ``"NE"`` \| ``"E"`` \| ``"SE"`` \| ``"S"`` \| ``"SW"`` \| ``"W"`` \| ``"NW"`` |

#### Returns

`T`

#### Defined in

[grid/functions/neighborOf.ts:47](https://github.com/flauwekeul/honeycomb/blob/master/src/grid/functions/neighborOf.ts#L47)

___

## Util Functions

### <a id="isFunction" name="isFunction"></a> isFunction

**isFunction**<`T`\>(`value`): value is T

Determines whether the passed value is a function.

Optionally pass a type variable, e.g.:
```ts
type MyFunction = (arg: number) => void

isFunction<MyFunction>(value)
```

The type of the arguments and return type aren't checked though.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`UnknownFunction`](index.md#UnknownFunction) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is T

#### Defined in

[utils/isFunction.ts:20](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isFunction.ts#L20)

___

### <a id="isNumber" name="isNumber"></a> isNumber

**isNumber**(`value`): value is number

Determines whether the passed value is a finite number (excluding `NaN`).

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is number

#### Defined in

[utils/isNumber.ts:6](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isNumber.ts#L6)

___

### <a id="isObject" name="isObject"></a> isObject

**isObject**<`T`\>(`value`): value is T

Determines whether the passed value is an object.

Optionally pass a type variable, e.g.:
```ts
interface MyObject {
  a: number
  b: string
}

isObject<MyObject>(value)
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`PropertyKey`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is T

#### Defined in

[utils/isObject.ts:16](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/isObject.ts#L16)

___

### <a id="rotate" name="rotate"></a> rotate

**rotate**(`direction`, `steps`): ``"N"`` \| ``"NE"`` \| ``"E"`` \| ``"SE"`` \| ``"S"`` \| ``"SW"`` \| ``"W"`` \| ``"NW"``

Takes a current direction and an amount of steps and returns a new direction.

A positive amount of steps rotates clockwise, a negative amount of steps rotates counterclockwise.

It takes 8 steps to make a full rotation (see [DIRECTIONS](index.md#DIRECTIONS)). If `steps` is greater than `8` or less than `-8`,
it "wraps around" and its remainder is used.

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | ``"N"`` \| ``"NE"`` \| ``"E"`` \| ``"SE"`` \| ``"S"`` \| ``"SW"`` \| ``"W"`` \| ``"NW"`` |
| `steps` | `number` |

#### Returns

``"N"`` \| ``"NE"`` \| ``"E"`` \| ``"SE"`` \| ``"S"`` \| ``"SW"`` \| ``"W"`` \| ``"NW"``

**`Example`**

```ts
// rotate 2 steps clockwise
rotate('N', 2) // returns 'E'

// rotate 4 steps counterclockwise
rotate('N', -4) // returns 'S'

// rotate 3 steps clockwise
rotate('N', 11) // returns 'SE'
```

#### Defined in

[utils/rotate.ts:26](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/rotate.ts#L26)

___

### <a id="signedModulo" name="signedModulo"></a> signedModulo

**signedModulo**(`dividend`, `divisor`): `number`

Modulo operator (instead of remainder operator `%`).
See the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#:~:text=To%20obtain%20a%20modulo%20in%20JavaScript%2C%20in%20place%20of%20n%20%25%20d%2C%20use%20((n%20%25%20d)%20%2B%20d)%20%25%20d.) for more information.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dividend` | `number` |
| `divisor` | `number` |

#### Returns

`number`

#### Defined in

[utils/signedModulo.ts:7](https://github.com/flauwekeul/honeycomb/blob/master/src/utils/signedModulo.ts#L7)
