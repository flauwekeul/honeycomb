# Class: Compass

## Table of contents

### Properties

- [Cardinal](Compass.md#Cardinal)
- [E](Compass.md#E)
- [N](Compass.md#N)
- [NE](Compass.md#NE)
- [NW](Compass.md#NW)
- [Ordinal](Compass.md#Ordinal)
- [S](Compass.md#S)
- [SE](Compass.md#SE)
- [SW](Compass.md#SW)
- [W](Compass.md#W)
- [direction](Compass.md#direction)

### Constructors

- [constructor](Compass.md#constructor)

### Methods

- [isCardinal](Compass.md#isCardinal)
- [isCardinal](Compass.md#isCardinal-1)
- [isOrdinal](Compass.md#isOrdinal)
- [isOrdinal](Compass.md#isOrdinal-1)
- [of](Compass.md#of)
- [rotate](Compass.md#rotate)
- [rotate](Compass.md#rotate-1)

## Properties

### <a id="Cardinal" name="Cardinal"></a> Cardinal

 `Static` **Cardinal**: [`CardinalCompassDirection`](../enums/CardinalCompassDirection.md)

#### Defined in

[compass/compass.ts:41](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L41)

___

### <a id="E" name="E"></a> E

 `Static` **E**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.E`

#### Defined in

[compass/compass.ts:35](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L35)

___

### <a id="N" name="N"></a> N

 `Static` **N**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.N`

#### Defined in

[compass/compass.ts:33](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L33)

___

### <a id="NE" name="NE"></a> NE

 `Static` **NE**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.NE`

#### Defined in

[compass/compass.ts:34](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L34)

___

### <a id="NW" name="NW"></a> NW

 `Static` **NW**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.NW`

#### Defined in

[compass/compass.ts:40](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L40)

___

### <a id="Ordinal" name="Ordinal"></a> Ordinal

 `Static` **Ordinal**: [`OrdinalCompassDirection`](../enums/OrdinalCompassDirection.md)

#### Defined in

[compass/compass.ts:42](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L42)

___

### <a id="S" name="S"></a> S

 `Static` **S**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.S`

#### Defined in

[compass/compass.ts:37](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L37)

___

### <a id="SE" name="SE"></a> SE

 `Static` **SE**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.SE`

#### Defined in

[compass/compass.ts:36](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L36)

___

### <a id="SW" name="SW"></a> SW

 `Static` **SW**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.SW`

#### Defined in

[compass/compass.ts:38](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L38)

___

### <a id="W" name="W"></a> W

 `Static` **W**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.W`

#### Defined in

[compass/compass.ts:39](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L39)

___

### <a id="direction" name="direction"></a> direction

 **direction**: [`CompassDirection`](../enums/CompassDirection.md)

#### Defined in

[compass/compass.ts:60](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L60)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

**new Compass**(`direction?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `direction` | [`CompassDirectionLike`](../index.md#CompassDirectionLike) | `CompassDirection.N` |

#### Defined in

[compass/compass.ts:62](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L62)

## Methods

### <a id="isCardinal" name="isCardinal"></a> isCardinal

`Static` **isCardinal**(`direction`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | [`CompassDirection`](../enums/CompassDirection.md) |

#### Returns

`boolean`

#### Defined in

[compass/compass.ts:48](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L48)

___

### <a id="isCardinal-1" name="isCardinal-1"></a> isCardinal

**isCardinal**(): `boolean`

#### Returns

`boolean`

#### Defined in

[compass/compass.ts:66](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L66)

___

### <a id="isOrdinal" name="isOrdinal"></a> isOrdinal

`Static` **isOrdinal**(`direction`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | [`CompassDirection`](../enums/CompassDirection.md) |

#### Returns

`boolean`

#### Defined in

[compass/compass.ts:52](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L52)

___

### <a id="isOrdinal-1" name="isOrdinal-1"></a> isOrdinal

**isOrdinal**(): `boolean`

#### Returns

`boolean`

#### Defined in

[compass/compass.ts:70](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L70)

___

### <a id="of" name="of"></a> of

`Static` **of**(`direction?`): [`Compass`](Compass.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `direction` | [`CompassDirectionLike`](../index.md#CompassDirectionLike) | `CompassDirection.N` |

#### Returns

[`Compass`](Compass.md)

#### Defined in

[compass/compass.ts:44](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L44)

___

### <a id="rotate" name="rotate"></a> rotate

`Static` **rotate**(`direction`, `steps`): [`CompassDirection`](../enums/CompassDirection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `number` |
| `steps` | `number` |

#### Returns

[`CompassDirection`](../enums/CompassDirection.md)

#### Defined in

[compass/compass.ts:56](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L56)

___

### <a id="rotate-1" name="rotate-1"></a> rotate

**rotate**(`steps`): [`CompassDirection`](../enums/CompassDirection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `steps` | `number` |

#### Returns

[`CompassDirection`](../enums/CompassDirection.md)

#### Defined in

[compass/compass.ts:74](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L74)
