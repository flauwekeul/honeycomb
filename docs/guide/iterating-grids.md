# Iterating grids

A grid instance itself is an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol):

```typescript
const Hex = defineHex()
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))

for (const hex of grid) {
  // do something with each hex
}
```

But if you prefer a more declarative way of working, there are some methods available that are very similar to [those of `Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods):

```typescript
grid
  .filter((hex) => hex.q > 2)
  .map((hex) => hex.clone({ q: hex.q + 1, r: hex.r }))
  .forEach((hex) => {
    console.log(hex)
  })
  .reduce((sum, hex) => sum + hex.r, 0)
```

::: info
Grid's `forEach()` is different from `Array`'s `forEach()`. In the example above `reduce()` is "chained" right after `forEach()`. Because `Array`'s `forEach()` returns `undefined`, you can't call `reduce()` (or any property for that matter) once you've called `forEach()`:
```typescript
[1, 2, 3]
  .forEach((number) => {
    console.log(number)
  })
  .reduce()
// ^^^^^^ Property 'reduce' does not exist on type 'void'.
```
:::
