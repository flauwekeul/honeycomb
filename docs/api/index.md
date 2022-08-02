# API - v4.0.0-alpha.5

## Table of contents

### Coordinates Interfaces

- [AxialCoordinates](interfaces/AxialCoordinates.md)
- [CubeCoordinates](interfaces/CubeCoordinates.md)
- [OffsetCoordinates](interfaces/OffsetCoordinates.md)

### Hex Interfaces

- [Hex](interfaces/Hex.md)
- [HexPrototype](interfaces/HexPrototype.md)
- [HexPrototypeOptions](interfaces/HexPrototypeOptions.md)
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
- [Point](interfaces/Point.md)

### Classes

- [Compass](classes/Compass.md)
- [Grid](classes/Grid.md)

### Hex Enumerations

- [Orientation](enums/Orientation.md)

### Other Enumerations

- [CompassDirection](enums/CompassDirection.md)
- [Rotation](enums/Rotation.md)

### Coordinates Type Aliases

- [HexCoordinates](index.md#HexCoordinates)
- [PartialCubeCoordinates](index.md#PartialCubeCoordinates)
- [TupleCoordinates](index.md#TupleCoordinates)

### Hex Type Aliases

- [OriginFn](index.md#OriginFn)
- [hexDimensions](index.md#hexDimensions)

### Traverser Type Aliases

- [Traverser](index.md#Traverser)

### Other Type Aliases

- [CompassDirectionLike](index.md#CompassDirectionLike)
- [RotationLike](index.md#RotationLike)

### Coordinates Functions

- [assertCubeCoordinates](index.md#assertCubeCoordinates)
- [completeCubeCoordinates](index.md#completeCubeCoordinates)
- [isAxial](index.md#isAxial)
- [isOffset](index.md#isOffset)
- [isTuple](index.md#isTuple)
- [tupleToCube](index.md#tupleToCube)

### Hex Functions

- [center](index.md#center)
- [cloneHex](index.md#cloneHex)
- [corners](index.md#corners)
- [createHex](index.md#createHex)
- [createHexPrototype](index.md#createHexPrototype)
- [equals](index.md#equals)
- [height](index.md#height)
- [hexToOffset](index.md#hexToOffset)
- [hexToPoint](index.md#hexToPoint)
- [isFlat](index.md#isFlat)
- [isHex](index.md#isHex)
- [isPointy](index.md#isPointy)
- [offsetToCube](index.md#offsetToCube)
- [pointToCube](index.md#pointToCube)
- [round](index.md#round)
- [translate](index.md#translate)
- [width](index.md#width)

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

- [cornersFlat](index.md#cornersFlat)
- [cornersPointy](index.md#cornersPointy)
- [distance](index.md#distance)
- [isPoint](index.md#isPoint)
- [neighborOf](index.md#neighborOf)
- [offsetFromZero](index.md#offsetFromZero)

## Coordinates Type Aliases

### <a id="HexCoordinates" name="HexCoordinates"></a> HexCoordinates

 **HexCoordinates**: [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) \| [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) \| [`TupleCoordinates`](index.md#TupleCoordinates)

#### Defined in

[hex/types.ts:54](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L54)

___

### <a id="PartialCubeCoordinates" name="PartialCubeCoordinates"></a> PartialCubeCoordinates

 **PartialCubeCoordinates**: { `q?`: `number` ; `r`: `number` ; `s`: `number`  } \| { `q`: `number` ; `r?`: `number` ; `s`: `number`  } \| { `q`: `number` ; `r`: `number` ; `s?`: `number`  }

#### Defined in

[hex/types.ts:41](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L41)

___

### <a id="TupleCoordinates" name="TupleCoordinates"></a> TupleCoordinates

 **TupleCoordinates**: [q: number, r: number, s?: number]

#### Defined in

[hex/types.ts:49](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L49)

___

## Hex Type Aliases

### <a id="OriginFn" name="OriginFn"></a> OriginFn

 **OriginFn**: <T\>(`prototype`: `T`) => [`Point`](interfaces/Point.md)

#### Type declaration

<`T`\>(`prototype`): [`Point`](interfaces/Point.md)

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Omit`<[`HexPrototype`](interfaces/HexPrototype.md), ``"origin"``\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `prototype` | `T` |

##### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/createHexPrototype.ts:130](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexPrototype.ts#L130)

___

### <a id="hexDimensions" name="hexDimensions"></a> hexDimensions

 **hexDimensions**: [`Ellipse`](interfaces/Ellipse.md) \| [`BoundingBox`](interfaces/BoundingBox.md) \| `number`

#### Defined in

[hex/types.ts:69](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L69)

___

## Traverser Type Aliases

### <a id="Traverser" name="Traverser"></a> Traverser

 **Traverser**<`T`, `R`\>: (`createHex`: (`coordinates?`: [`HexCoordinates`](index.md#HexCoordinates)) => `T`, `cursor?`: [`HexCoordinates`](index.md#HexCoordinates)) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md) |
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

___

### <a id="RotationLike" name="RotationLike"></a> RotationLike

 **RotationLike**: [`Rotation`](enums/Rotation.md) \| ``"CLOCKWISE"`` \| ``"clockwise"`` \| ``"COUNTERCLOCKWISE"`` \| ``"counterclockwise"``

#### Defined in

[grid/types.ts:21](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L21)

## Coordinates Functions

### <a id="assertCubeCoordinates" name="assertCubeCoordinates"></a> assertCubeCoordinates

**assertCubeCoordinates**(`hexPrototype`, `coordinates`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

Util for converting offset/axial/cube/tuple coordinates to cube coordinates.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexPrototype` | `Pick`<[`HexPrototype`](interfaces/HexPrototype.md), ``"offset"`` \| ``"isPointy"``\> |
| `coordinates` | [`HexCoordinates`](index.md#HexCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/assertCubeCoordinates.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/assertCubeCoordinates.ts#L11)

___

### <a id="completeCubeCoordinates" name="completeCubeCoordinates"></a> completeCubeCoordinates

**completeCubeCoordinates**(`__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/completeCubeCoordinates.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/completeCubeCoordinates.ts#L6)

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

[utils/isAxial.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isAxial.ts#L7)

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

[utils/isOffset.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isOffset.ts#L7)

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

[utils/isTuple.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isTuple.ts#L6)

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

### <a id="center" name="center"></a> center

**center**(`hexOrPrototype`): [`Point`](interfaces/Point.md)

When passed a **[Hex](interfaces/Hex.md)**, its center relative to the **"origin hex"** (with coordinates `[0, 0]`) is returned. This is different for every hex.

When passed a **[HexPrototype](interfaces/HexPrototype.md)**, the center relative to its **own origin** is returned. This is the same for every hex.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexOrPrototype` | [`Hex`](interfaces/Hex.md) \| `Pick`<[`HexPrototype`](interfaces/HexPrototype.md), ``"height"`` \| ``"width"`` \| ``"origin"``\> |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/center.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/center.ts#L11)

___

### <a id="cloneHex" name="cloneHex"></a> cloneHex

**cloneHex**<`T`\>(`hex`, `newProps?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `newProps` | [`HexCoordinates`](index.md#HexCoordinates) \| `Partial`<`T`\> |

#### Returns

`T`

#### Defined in

[hex/functions/cloneHex.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/cloneHex.ts#L8)

___

### <a id="corners" name="corners"></a> corners

**corners**(`hex`): [`Point`](interfaces/Point.md)[]

When passed a **[Hex](interfaces/Hex.md)**, its corners relative to the **"origin hex"** (with coordinates `[0, 0]`) is returned. This is different for every hex.

When passed **[HexSettings](interfaces/HexSettings.md)**, the corners relative to its **own origin** is returned. This is the same for every hex.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | [`Hex`](interfaces/Hex.md) |

#### Returns

[`Point`](interfaces/Point.md)[]

#### Defined in

[hex/functions/corners.ts:32](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/corners.ts#L32)

**corners**(`hexSettings`): [`Point`](interfaces/Point.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexSettings` | `Omit`<[`HexSettings`](interfaces/HexSettings.md), ``"offset"``\> |

#### Returns

[`Point`](interfaces/Point.md)[]

#### Defined in

[hex/functions/corners.ts:33](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/corners.ts#L33)

___

### <a id="createHex" name="createHex"></a> createHex

**createHex**<`T`\>(`prototypeOrHex`, `props?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prototypeOrHex` | `T` |
| `props` | [`HexCoordinates`](index.md#HexCoordinates) \| `Partial`<`T`\> |

#### Returns

`T`

#### Defined in

[hex/functions/createHex.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHex.ts#L9)

___

### <a id="createHexPrototype" name="createHexPrototype"></a> createHexPrototype

**createHexPrototype**<`T`\>(`options?`): `T`

**`Remarks`**

⚠️ The methods `clone()`, `equals()` and `toString()` are "protected".
If you custom hex prototype overwrites these methods, things may break unexpectedly.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`HexPrototypeOptions`](interfaces/HexPrototypeOptions.md) \| `Omit`<`T`, keyof [`HexPrototypeOptions`](interfaces/HexPrototypeOptions.md)\>\> |

#### Returns

`T`

#### Defined in

[hex/functions/createHexPrototype.ts:31](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexPrototype.ts#L31)

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

### <a id="height" name="height"></a> height

**height**(`__namedParameters`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`HexSettings`](interfaces/HexSettings.md) |

#### Returns

`number`

#### Defined in

[hex/functions/height.ts:16](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/height.ts#L16)

___

### <a id="hexToOffset" name="hexToOffset"></a> hexToOffset

**hexToOffset**(`__namedParameters`): [`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`Hex`](interfaces/Hex.md), ``"q"`` \| ``"r"`` \| ``"offset"`` \| ``"isPointy"``\> |

#### Returns

[`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Defined in

[hex/functions/hexToOffset.ts:17](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToOffset.ts#L17)

___

### <a id="hexToPoint" name="hexToPoint"></a> hexToPoint

**hexToPoint**(`__namedParameters`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Hex`](interfaces/Hex.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/hexToPoint.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToPoint.ts#L6)

___

### <a id="isFlat" name="isFlat"></a> isFlat

**isFlat**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`HexSettings`](interfaces/HexSettings.md) |

#### Returns

`boolean`

#### Defined in

[hex/functions/isFlat.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/isFlat.ts#L6)

___

### <a id="isHex" name="isHex"></a> isHex

**isHex**(`value`): value is Hex

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Hex

#### Defined in

[hex/functions/isHex.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/isHex.ts#L7)

___

### <a id="isPointy" name="isPointy"></a> isPointy

**isPointy**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`HexSettings`](interfaces/HexSettings.md) |

#### Returns

`boolean`

#### Defined in

[hex/functions/isPointy.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/isPointy.ts#L6)

___

### <a id="offsetToCube" name="offsetToCube"></a> offsetToCube

**offsetToCube**(`__namedParameters`, `__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`HexPrototype`](interfaces/HexPrototype.md), ``"offset"`` \| ``"isPointy"``\> |
| `__namedParameters` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/offsetToCube.ts:27](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/offsetToCube.ts#L27)

___

### <a id="pointToCube" name="pointToCube"></a> pointToCube

**pointToCube**(`__namedParameters`, `__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`HexPrototype`](interfaces/HexPrototype.md), ``"isPointy"`` \| ``"dimensions"`` \| ``"origin"``\> |
| `__namedParameters` | [`Point`](interfaces/Point.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/pointToCube.ts:10](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/pointToCube.ts#L10)

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `T` |
| `delta` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

`T`

#### Defined in

[hex/functions/translate.ts:10](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/translate.ts#L10)

**translate**(`coordinates`, `delta`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |
| `delta` | [`PartialCubeCoordinates`](index.md#PartialCubeCoordinates) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/translate.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/translate.ts#L11)

___

### <a id="width" name="width"></a> width

**width**(`__namedParameters`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`HexSettings`](interfaces/HexSettings.md) |

#### Returns

`number`

#### Defined in

[hex/functions/width.ts:16](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/width.ts#L16)

___

## Traverser Functions

### <a id="concat" name="concat"></a> concat

**concat**<`T`\>(`traversers`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RingOptions`](interfaces/RingOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/ring.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/ring.ts#L8)

**ring**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RingFromRadiusOptions`](interfaces/RingFromRadiusOptions.md) |

#### Returns

[`Traverser`](index.md#Traverser)<`T`\>

#### Defined in

[grid/traversers/ring.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/ring.ts#L9)

___

### <a id="spiral" name="spiral"></a> spiral

**spiral**<`T`\>(`__namedParameters`): [`Traverser`](index.md#Traverser)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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

### <a id="cornersFlat" name="cornersFlat"></a> cornersFlat

**cornersFlat**(`width`, `height`, `__namedParameters`): { `x`: `number` ; `y`: `number`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |
| `__namedParameters` | [`Point`](interfaces/Point.md) |

#### Returns

{ `x`: `number` ; `y`: `number`  }[]

#### Defined in

[hex/functions/corners.ts:16](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/corners.ts#L16)

___

### <a id="cornersPointy" name="cornersPointy"></a> cornersPointy

**cornersPointy**(`width`, `height`, `__namedParameters`): { `x`: `number` ; `y`: `number`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |
| `__namedParameters` | [`Point`](interfaces/Point.md) |

#### Returns

{ `x`: `number` ; `y`: `number`  }[]

#### Defined in

[hex/functions/corners.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/corners.ts#L7)

___

### <a id="distance" name="distance"></a> distance

**distance**(`hexPrototype`, `from`, `to`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexPrototype` | `Pick`<[`HexPrototype`](interfaces/HexPrototype.md), ``"offset"`` \| ``"isPointy"``\> |
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

[utils/isPoint.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isPoint.ts#L4)

___

### <a id="neighborOf" name="neighborOf"></a> neighborOf

**neighborOf**<`T`\>(`hex`, `direction`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

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
| `offset` | `number` |
| `distance` | `number` |

#### Returns

`number`

#### Defined in

[utils/offsetFromZero.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/offsetFromZero.ts#L3)
