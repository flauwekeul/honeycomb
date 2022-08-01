# Class: Compass

## Table of contents

### Properties

- [E](Compass.md#E)
- [N](Compass.md#N)
- [NE](Compass.md#NE)
- [NW](Compass.md#NW)
- [S](Compass.md#S)
- [SE](Compass.md#SE)
- [SW](Compass.md#SW)
- [W](Compass.md#W)
- [direction](Compass.md#direction)

### Constructors

- [constructor](Compass.md#constructor)

### Methods

- [of](Compass.md#of)
- [rotate](Compass.md#rotate)
- [rotate](Compass.md#rotate-1)

## Properties

### <a id="E" name="E"></a> E

 `Static` **E**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.E`

#### Defined in

[compass/compass.ts:21](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L21)

___

### <a id="N" name="N"></a> N

 `Static` **N**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.N`

#### Defined in

[compass/compass.ts:19](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L19)

___

### <a id="NE" name="NE"></a> NE

 `Static` **NE**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.NE`

#### Defined in

[compass/compass.ts:20](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L20)

___

### <a id="NW" name="NW"></a> NW

 `Static` **NW**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.NW`

#### Defined in

[compass/compass.ts:26](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L26)

___

### <a id="S" name="S"></a> S

 `Static` **S**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.S`

#### Defined in

[compass/compass.ts:23](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L23)

___

### <a id="SE" name="SE"></a> SE

 `Static` **SE**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.SE`

#### Defined in

[compass/compass.ts:22](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L22)

___

### <a id="SW" name="SW"></a> SW

 `Static` **SW**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.SW`

#### Defined in

[compass/compass.ts:24](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L24)

___

### <a id="W" name="W"></a> W

 `Static` **W**: [`CompassDirection`](../enums/CompassDirection.md) = `CompassDirection.W`

#### Defined in

[compass/compass.ts:25](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L25)

___

### <a id="direction" name="direction"></a> direction

 **direction**: [`CompassDirection`](../enums/CompassDirection.md)

#### Defined in

[compass/compass.ts:36](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L36)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

**new Compass**(`direction?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `direction` | [`CompassDirectionLike`](../index.md#CompassDirectionLike) | `CompassDirection.N` |

#### Defined in

[compass/compass.ts:38](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L38)

## Methods

### <a id="of" name="of"></a> of

`Static` **of**(`direction?`): [`Compass`](Compass.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `direction` | [`CompassDirectionLike`](../index.md#CompassDirectionLike) | `CompassDirection.N` |

#### Returns

[`Compass`](Compass.md)

#### Defined in

[compass/compass.ts:28](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L28)

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

[compass/compass.ts:32](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L32)

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

[compass/compass.ts:42](https://github.com/flauwekeul/honeycomb/blob/next/src/compass/compass.ts#L42)
