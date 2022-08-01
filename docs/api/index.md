# API - v4.0.0-alpha.5

## Table of contents

### Interfaces

- [AxialCoordinates](interfaces/AxialCoordinates.md)
- [BoundingBox](interfaces/BoundingBox.md)
- [CubeCoordinates](interfaces/CubeCoordinates.md)
- [Ellipse](interfaces/Ellipse.md)
- [GridAsJSON](interfaces/GridAsJSON.md)
- [Hex](interfaces/Hex.md)
- [HexPrototype](interfaces/HexPrototype.md)
- [HexPrototypeOptions](interfaces/HexPrototypeOptions.md)
- [HexSettings](interfaces/HexSettings.md)
- [LineAsVectorOptions](interfaces/LineAsVectorOptions.md)
- [LineBetweenOptions](interfaces/LineBetweenOptions.md)
- [OffsetCoordinates](interfaces/OffsetCoordinates.md)
- [PartialCubeCoordinates](interfaces/PartialCubeCoordinates.md)
- [Point](interfaces/Point.md)
- [RectangleOptions](interfaces/RectangleOptions.md)
- [RingFromRadiusOptions](interfaces/RingFromRadiusOptions.md)
- [RingOptions](interfaces/RingOptions.md)
- [SpiralOptions](interfaces/SpiralOptions.md)

### Enumerations

- [CardinalCompassDirection](enums/CardinalCompassDirection.md)
- [CompassDirection](enums/CompassDirection.md)
- [OrdinalCompassDirection](enums/OrdinalCompassDirection.md)
- [Orientation](enums/Orientation.md)
- [Rotation](enums/Rotation.md)

### Classes

- [Compass](classes/Compass.md)
- [Grid](classes/Grid.md)

### Type Aliases

- [CompassDirectionLike](index.md#CompassDirectionLike)
- [HexCoordinates](index.md#HexCoordinates)
- [OriginFn](index.md#OriginFn)
- [RotationLike](index.md#RotationLike)
- [Traverser](index.md#Traverser)
- [TupleCoordinates](index.md#TupleCoordinates)
- [Without](index.md#Without)
- [XOR](index.md#XOR)
- [hexDimensions](index.md#hexDimensions)

### Functions

- [center](index.md#center)
- [cloneHex](index.md#cloneHex)
- [concat](index.md#concat)
- [corners](index.md#corners)
- [cornersFlat](index.md#cornersFlat)
- [cornersPointy](index.md#cornersPointy)
- [createHex](index.md#createHex)
- [createHexPrototype](index.md#createHexPrototype)
- [distance](index.md#distance)
- [equals](index.md#equals)
- [fromCoordinates](index.md#fromCoordinates)
- [height](index.md#height)
- [heightFlat](index.md#heightFlat)
- [heightPointy](index.md#heightPointy)
- [hexToOffset](index.md#hexToOffset)
- [hexToOffsetFlat](index.md#hexToOffsetFlat)
- [hexToOffsetPointy](index.md#hexToOffsetPointy)
- [hexToPoint](index.md#hexToPoint)
- [isAxial](index.md#isAxial)
- [isFlat](index.md#isFlat)
- [isHex](index.md#isHex)
- [isOffset](index.md#isOffset)
- [isPoint](index.md#isPoint)
- [isPointy](index.md#isPointy)
- [isTuple](index.md#isTuple)
- [line](index.md#line)
- [move](index.md#move)
- [neighborOf](index.md#neighborOf)
- [neighborOfFlat](index.md#neighborOfFlat)
- [neighborOfPointy](index.md#neighborOfPointy)
- [offsetFromZero](index.md#offsetFromZero)
- [offsetToCube](index.md#offsetToCube)
- [offsetToCubeFlat](index.md#offsetToCubeFlat)
- [offsetToCubePointy](index.md#offsetToCubePointy)
- [pointToCube](index.md#pointToCube)
- [rectangle](index.md#rectangle)
- [repeat](index.md#repeat)
- [repeatWith](index.md#repeatWith)
- [ring](index.md#ring)
- [round](index.md#round)
- [spiral](index.md#spiral)
- [toString](index.md#toString)
- [tupleToCube](index.md#tupleToCube)
- [width](index.md#width)
- [widthFlat](index.md#widthFlat)
- [widthPointy](index.md#widthPointy)

### Variables

- [defaultHexSettings](index.md#defaultHexSettings)

## Type Aliases

### <a id="CompassDirectionLike" name="CompassDirectionLike"></a> CompassDirectionLike

 **CompassDirectionLike**: keyof typeof [`CompassDirection`](enums/CompassDirection.md) \| `number`

#### Defined in

[compass/compass.ts:30](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L30)

___

### <a id="HexCoordinates" name="HexCoordinates"></a> HexCoordinates

 **HexCoordinates**: [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md) \| [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) \| [`TupleCoordinates`](index.md#TupleCoordinates)

#### Defined in

[hex/types.ts:34](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L34)

___

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

[hex/functions/createHexPrototype.ts:120](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexPrototype.ts#L120)

___

### <a id="RotationLike" name="RotationLike"></a> RotationLike

 **RotationLike**: [`Rotation`](enums/Rotation.md) \| ``"CLOCKWISE"`` \| ``"clockwise"`` \| ``"COUNTERCLOCKWISE"`` \| ``"counterclockwise"``

#### Defined in

[grid/types.ts:18](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L18)

___

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

[grid/types.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L3)

___

### <a id="TupleCoordinates" name="TupleCoordinates"></a> TupleCoordinates

 **TupleCoordinates**: [q: number, r: number, s?: number]

#### Defined in

[hex/types.ts:32](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L32)

___

### <a id="Without" name="Without"></a> Without

 **Without**<`T`, `U`\>: { [P in Exclude<keyof T, keyof U\>]?: never }

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[grid/types.ts:21](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L21)

___

### <a id="XOR" name="XOR"></a> XOR

 **XOR**<`T`, `U`\>: `T` \| `U` extends `Record`<`string`, `unknown`\> ? [`Without`](index.md#Without)<`T`, `U`\> & `U` \| [`Without`](index.md#Without)<`U`, `T`\> & `T` : `T` \| `U`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[grid/types.ts:22](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/types.ts#L22)

___

### <a id="hexDimensions" name="hexDimensions"></a> hexDimensions

 **hexDimensions**: [`Ellipse`](interfaces/Ellipse.md) \| [`BoundingBox`](interfaces/BoundingBox.md) \| `number`

#### Defined in

[hex/types.ts:46](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/types.ts#L46)

## Functions

### <a id="center" name="center"></a> center

**center**(`hexOrPrototype`): [`Point`](interfaces/Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexOrPrototype` | [`Hex`](interfaces/Hex.md) \| `Pick`<[`HexPrototype`](interfaces/HexPrototype.md), ``"height"`` \| ``"width"`` \| ``"origin"``\> |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[hex/functions/center.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/center.ts#L6)

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

[hex/functions/cloneHex.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/cloneHex.ts#L5)

___

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

[grid/traversers/concat.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/concat.ts#L4)

___

### <a id="corners" name="corners"></a> corners

**corners**(`hex`): [`Point`](interfaces/Point.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | [`Hex`](interfaces/Hex.md) |

#### Returns

[`Point`](interfaces/Point.md)[]

#### Defined in

[hex/functions/corners.ts:27](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/corners.ts#L27)

**corners**(`hexSettings`): [`Point`](interfaces/Point.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexSettings` | `Omit`<[`HexSettings`](interfaces/HexSettings.md), ``"offset"``\> |

#### Returns

[`Point`](interfaces/Point.md)[]

#### Defined in

[hex/functions/corners.ts:28](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/corners.ts#L28)

___

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

[hex/functions/createHex.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHex.ts#L6)

___

### <a id="createHexPrototype" name="createHexPrototype"></a> createHexPrototype

**createHexPrototype**<`T`\>(`options?`): `T`

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

[hex/functions/createHexPrototype.ts:23](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexPrototype.ts#L23)

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

### <a id="equals" name="equals"></a> equals

**equals**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md) \| [`TupleCoordinates`](index.md#TupleCoordinates) |
| `b` | [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md) \| [`TupleCoordinates`](index.md#TupleCoordinates) |

#### Returns

`boolean`

#### Defined in

[hex/functions/equals.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/equals.ts#L4)

**equals**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |
| `b` | [`OffsetCoordinates`](interfaces/OffsetCoordinates.md) |

#### Returns

`boolean`

#### Defined in

[hex/functions/equals.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/equals.ts#L8)

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

[grid/traversers/fromCoordinates.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/fromCoordinates.ts#L5)

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

[hex/functions/height.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/height.ts#L7)

___

### <a id="heightFlat" name="heightFlat"></a> heightFlat

**heightFlat**(`yRadius`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `yRadius` | `number` |

#### Returns

`number`

#### Defined in

[hex/functions/height.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/height.ts#L5)

___

### <a id="heightPointy" name="heightPointy"></a> heightPointy

**heightPointy**(`yRadius`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `yRadius` | `number` |

#### Returns

`number`

#### Defined in

[hex/functions/height.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/height.ts#L3)

___

### <a id="hexToOffset" name="hexToOffset"></a> hexToOffset

**hexToOffset**(`__namedParameters`): [`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`Hex`](interfaces/Hex.md), ``"offset"`` \| ``"isPointy"`` \| ``"q"`` \| ``"r"``\> |

#### Returns

[`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Defined in

[hex/functions/hexToOffset.ts:14](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToOffset.ts#L14)

___

### <a id="hexToOffsetFlat" name="hexToOffsetFlat"></a> hexToOffsetFlat

**hexToOffsetFlat**(`q`, `r`, `offset`): [`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `number` |
| `r` | `number` |
| `offset` | `number` |

#### Returns

[`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Defined in

[hex/functions/hexToOffset.ts:9](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToOffset.ts#L9)

___

### <a id="hexToOffsetPointy" name="hexToOffsetPointy"></a> hexToOffsetPointy

**hexToOffsetPointy**(`q`, `r`, `offset`): [`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `number` |
| `r` | `number` |
| `offset` | `number` |

#### Returns

[`OffsetCoordinates`](interfaces/OffsetCoordinates.md)

#### Defined in

[hex/functions/hexToOffset.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToOffset.ts#L4)

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

[hex/functions/hexToPoint.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/hexToPoint.ts#L3)

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

[utils/isAxial.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isAxial.ts#L4)

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

[hex/functions/isFlat.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/isFlat.ts#L3)

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

[hex/functions/isHex.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/isHex.ts#L4)

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

[utils/isOffset.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isOffset.ts#L4)

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

### <a id="isPointy" name="isPointy"></a> isPointy

**isPointy**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`HexSettings`](interfaces/HexSettings.md) |

#### Returns

`boolean`

#### Defined in

[hex/functions/isPointy.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/isPointy.ts#L3)

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

[utils/isTuple.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/isTuple.ts#L3)

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

[grid/traversers/line.ts:14](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/line.ts#L14)

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

[grid/traversers/line.ts:15](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/line.ts#L15)

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

[grid/traversers/move.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/move.ts#L7)

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

### <a id="neighborOfFlat" name="neighborOfFlat"></a> neighborOfFlat

**neighborOfFlat**<`T`\>(`__namedParameters`, `direction`): [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `T` |
| `direction` | [`CompassDirection`](enums/CompassDirection.md) |

#### Returns

[`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md)

#### Defined in

[grid/functions/neighborOf.ts:37](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/functions/neighborOf.ts#L37)

___

### <a id="neighborOfPointy" name="neighborOfPointy"></a> neighborOfPointy

**neighborOfPointy**<`T`\>(`__namedParameters`, `direction`): [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Hex`](interfaces/Hex.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `T` |
| `direction` | [`CompassDirection`](enums/CompassDirection.md) |

#### Returns

[`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md)

#### Defined in

[grid/functions/neighborOf.ts:25](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/functions/neighborOf.ts#L25)

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

[hex/functions/offsetToCube.ts:18](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/offsetToCube.ts#L18)

___

### <a id="offsetToCubeFlat" name="offsetToCubeFlat"></a> offsetToCubeFlat

**offsetToCubeFlat**(`col`, `row`, `offset`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `row` | `number` |
| `offset` | `number` |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/offsetToCube.ts:11](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/offsetToCube.ts#L11)

___

### <a id="offsetToCubePointy" name="offsetToCubePointy"></a> offsetToCubePointy

**offsetToCubePointy**(`col`, `row`, `offset`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `row` | `number` |
| `offset` | `number` |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/offsetToCube.ts:4](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/offsetToCube.ts#L4)

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

[hex/functions/pointToCube.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/pointToCube.ts#L6)

___

### <a id="rectangle" name="rectangle"></a> rectangle

**rectangle**<`T`\>(`options`): [`Traverser`](index.md#Traverser)<`T`\>

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

[grid/traversers/rectangle.ts:12](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/rectangle.ts#L12)

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

[grid/traversers/rectangle.ts:13](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/rectangle.ts#L13)

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

[grid/traversers/repeat.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/repeat.ts#L5)

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

[grid/traversers/repeatWith.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/repeatWith.ts#L7)

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

[grid/traversers/ring.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/ring.ts#L5)

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

[grid/traversers/ring.ts:6](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/ring.ts#L6)

___

### <a id="round" name="round"></a> round

**round**(`__namedParameters`): [`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md) |

#### Returns

[`CubeCoordinates`](interfaces/CubeCoordinates.md)

#### Defined in

[hex/functions/round.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/round.ts#L3)

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

[grid/traversers/spiral.ts:8](https://github.com/flauwekeul/honeycomb/blob/next/src/grid/traversers/spiral.ts#L8)

___

### <a id="toString" name="toString"></a> toString

**toString**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PartialCubeCoordinates`](interfaces/PartialCubeCoordinates.md) |

#### Returns

`string`

#### Defined in

[hex/functions/toString.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/toString.ts#L3)

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

[utils/tupleToCube.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/utils/tupleToCube.ts#L3)

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

[hex/functions/width.ts:7](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/width.ts#L7)

___

### <a id="widthFlat" name="widthFlat"></a> widthFlat

**widthFlat**(`xRadius`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `xRadius` | `number` |

#### Returns

`number`

#### Defined in

[hex/functions/width.ts:5](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/width.ts#L5)

___

### <a id="widthPointy" name="widthPointy"></a> widthPointy

**widthPointy**(`xRadius`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `xRadius` | `number` |

#### Returns

`number`

#### Defined in

[hex/functions/width.ts:3](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/width.ts#L3)

## Variables

### <a id="defaultHexSettings" name="defaultHexSettings"></a> defaultHexSettings

 `Const` **defaultHexSettings**: [`HexSettings`](interfaces/HexSettings.md)

#### Defined in

[hex/functions/createHexPrototype.ts:16](https://github.com/flauwekeul/honeycomb/blob/next/src/hex/functions/createHexPrototype.ts#L16)
