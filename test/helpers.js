export function hexes(chai) {
    const Assertion = chai.Assertion

    Assertion.addMethod('hexes', function(expected) {
        const actual = this._obj
        const coordinates = hex => `{ x: ${hex.x}, y: ${hex.y} }`

        this.assert(
            expected.every(hex => actual.includes(hex)),
            'expected #{this} to contain #{exp}, but got #{act}',
            'expected #{this} to not contain #{exp}',
            expected.map(coordinates).join(', '),
            actual.map(coordinates).join(', ')
        )
    })
}
