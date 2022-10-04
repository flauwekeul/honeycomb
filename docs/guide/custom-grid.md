# Custom Grid

The `Grid` class implements three interfaces:

* [`HexStore`](/api/interfaces/HexStore): store, get and set hexes
* [`HexIterable`](/api/interfaces/HexIterable) (extends `HexStore`): iterate over hexes (methods very similar to those of `Array`)
* [`HexTraversable`](/api/interfaces/HexTraversable) (extends `HexStore`): create and traverse hexes

You can of course extend the `Grid` class and override/add methods.

```typescript
// Store is something similar to Grid
// where you currently manage your hexes
interface Store<T extends Hex> {
  hexes: IterableIterator<T>
  getSize(): number
  find(coordinates: HexCoordinates): T | undefined
  update(coordinates: HexCoordinates): void
}

// CustomGrid will act as an adapter for Store
// that works with Honeycomb's API
class CustomGrid<T extends Hex> extends Grid<T> {
  get size(): number {
    return this.#store.getSize()
  }

  [Symbol.iterator]() {
    return this.#store.hexes
  }

  #store: Store<T>

  constructor(hexClass: HexConstructor<T>, store: Store<T>) {
    super(hexClass)
    this.#store = store
  }

  getHex(coordinates: HexCoordinates): T | undefined {
    return this.#store.find(coordinates)
  }
}
```

Another possibility is to create your own class that implements one or more of these interfaces. Or create a function that returns an object that implements one or more of these interfaces.

```typescript
// createHexStore() returns only the functionality of Grid that's involved with "storing hexes" (as defined in the HexStore interface)
function createHexStore<T extends Hex>(store: Store<T>): HexStore<T> {
  const hexStore: HexStore<T> = {
    get size() {
      return store.getSize()
    },

    getHex(coordinates: HexCoordinates): T | undefined {
      return store.find(coordinates)
    },

    hasHex(hex: T): boolean {
      return Boolean(store.find(hex))
    },

    setHexes(hexesOrCoordinates: Iterable<T | HexCoordinates>): HexStore<T> {
      for (const coordinates of hexesOrCoordinates) {
        store.update(coordinates)
      }
      return hexStore
    }
  }

  return hexStore
}
```
