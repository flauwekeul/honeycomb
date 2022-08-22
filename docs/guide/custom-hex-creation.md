# Custom hex creation

::: tip
**TL;DR** Don't extend the `Hex` constructor, but add a static method for custom hex creation instead.
:::

## What you *shouldn't* do

You may be tempted to override the constructor of `Hex` to enable setting any custom properties, for example:

```typescript{4-7,10-11}
class CustomHex extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  custom: string

  constructor(coordinates: HexCoordinates, custom: string) {
    super(coordinates)
    this.custom = custom
  }
}

const grid = new Grid(CustomHex)
//                    ^^^^^^^^^ ❌ typescript will throw an error here
```

This works until you pass the class to `new Grid()`. The reason is that the library assumes this signature of the [`Hex` constructor](/api/#HexConstructor):

```typescript
type HexConstructor<T extends Hex> = new (coordinates?: HexCoordinates) => T
```

In other words: it will create hexes by passing (optional) `HexCoordinates` to the `Hex` constructor. Any other arguments you add to the constructor will be ignored. Also extending the `coordinates` argument with your own custom properties won't work.

So, what *should* you do instead?

## What you *should* do

A nice solution is to add your own "constructor" in the form of a static method. For example:

```typescript{2-6,11-14}
class CustomHex extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  static create(coordinates: HexCoordinates, custom: string) {
    const hex = new CustomHex(coordinates)
    hex.custom = custom
    return hex
  }

  custom!: string
}

const hexes = [[0, 0], [1, 0], [0, 1]].map(
  (coordinates) => CustomHex.create(coordinates, `I'm custom!`)
)
const grid = new Grid(CustomHex, hexes)
```
