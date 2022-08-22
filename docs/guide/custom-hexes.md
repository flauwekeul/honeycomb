# Custom hexes

When you start using Honeycomb, you probably want a custom grid: hexes with a certain size, a pointy or flat top and some custom properties. Hexes have most properties in their prototype (for performance reasons) and the most important ones are the four *[settings](/api/interfaces/HexSettings)*. All other properties of hexes are derived from these settings.

The [default hex settings](/api/#defaultHexSettings) are probably not what you need:

```typescript
const defaultHexSettings: HexSettings = {
  dimensions: { xRadius: 1, yRadius: 1 }, // these make for tiny hexes
  orientation: Orientation.POINTY, // pointy top
  origin: { x: 0, y: 0 }, // the center of the hex
  offset: -1, // how rows or columns of hexes are placed relative to each other
}
```

You can configure these settings using the [`defineHex()`](/api/#defineHex) helper or extending the [`Hex`](/api/classes/Hex) class yourself.

::: info
In JavaScript a class is actually a function that should be called with the `new` keyword. It then returns an object (an "instance") with the methods defined in the class in its prototype. Read more on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).
:::

## Using `defineHex()`

This function accepts [*hex options*](/api/interfaces/HexOptions) and returns a class that extends from [`Hex`](/api/classes/Hex).

```typescript
// CustomHex is a class (constructor function)
const CustomHex = defineHex({
  dimensions: 30,
  orientation: Orientation.FLAT,
  origin: 'topLeft',
  offset: 1
})

// hex is an instance
const hex = new CustomHex()

// hex instances created with CustomHex now have these hex settings:
hex.dimensions  // { xRadius: 30, yRadius: 30 }
hex.orientation // 'FLAT'
hex.origin      // { x: -30, y: -25.98… }, relative to the center of the hex
hex.offset      // 1
```

As you can see, for `dimensions` you can pass a number, which is interpreted as the radius. A [bounding box](/api/interfaces/BoundingBox) (an object with `width` and `height`) is also accepted.

<img src="../hex-dimensions.webp" alt="Hex dimensions" style="background-color: #ccc; padding: 1em; border-radius: 0.5em">

For `origin` the string `'topLeft'` is also valid, meaning the origin of the hex will be in the very top left corner. This is convenient when rendering hexes on screen and you treat a hex as a DOM element. DOM elements have their origin in their top left corner.

## Custom properties

Because `defineHex()` returns a class, you can simply extend that class to add your own properties and methods:

```typescript
class CustomHex extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  get prototypeProp() {
    return `this property won't be present in the instance, only in the prototype`
  }

  // this property is present in the instance
  instanceProp: string

  // methods always exist in the prototype
  customMethod() {}
}
```

Methods and getters/setters exist in the prototype; they're shared by all hexes. It's recommended to use **instance properties** only for things specific to a single hex. For example, a hex's axial coordinates (`q` and `r`) are the only instance properties on the built-in `Hex` class.

::: tip
If you have `strictPropertyInitialization` (or `strict`) enabled in your tsconfig, you'll get this typescript error:

> Property 'instanceProp' has no initializer and is not definitely assigned in the constructor.

You can fix this by making the property optional:
```typescript
instanceProp?: string
```
Or add a *definite assignment assertion* to tell TypeScript that the property won't be `undefined`:
```typescript
instanceProp!: string
```
See [Custom hex creation](#custom-hex-creation) below to make sure the property will actually have a value.
:::

## Extending `Hex` manually

If – for whatever reason – you don't want to use `defineHex()`, you can just extend `Hex` manually:

```typescript{1}
class CustomHex extends Hex {
  get dimensions(): Ellipse {
    return { xRadius: 30, yRadius: 30 }
  }

  get orientation(): Orientation {
    return Orientation.FLAT
  }

  get origin(): Point {
    return { x: -30, y: -25.98 }
  }

  get offset(): HexOffset {
    return 1
  }
}
```

Still want utilities for `dimensions` and `origin`? Use `createHexDimensions()` and `createHexOrigin()`:

```typescript{3,11}
class CustomHex extends Hex {
  get dimensions(): Ellipse {
    return createHexDimensions(30)
  }

  get orientation(): Orientation {
    return Orientation.FLAT
  }

  get origin(): Point {
    return createHexOrigin('topLeft', this)
  }

  get offset(): HexOffset {
    return 1
  }
}
```
