import { expect } from 'chai'

import extendHex, { defaultPrototype, staticMethods } from '../../src/hex'

describe('extendHex', function() {
    it('is a function', function() {
        const Hex = extendHex()
        expect(Hex).to.be.a('function')
    })

    it('returns a function that has the Hex static methods', function() {
        const Hex = extendHex()
        expect(Object.entries(Hex)).to.eql(Object.entries(staticMethods))
    })

    it('returns a function with the default prototype', function() {
        const Hex = extendHex()
        const prototype = Object.getPrototypeOf(Hex())

        expect(prototype).to.eql(defaultPrototype)
    })

    describe('when passed hex settings', function() {
        it('returns a Hex factory with any properties merged into the default prototype', function() {
            const prototype = {
                size: 100,
                custom: 'property'
            }
            const Hex = extendHex(prototype)
            const finalPrototype = Object.getPrototypeOf(Hex())

            expect(finalPrototype).to.have.own.property('size', 100)
            expect(finalPrototype).to.have.own.property('custom')
        })
    })
})

describe('Hex creation', function() {
    let Hex

    before(function() {
        Hex = extendHex()
    })

    describe('with 3 numbers', function() {
        it('sets them as cube coordinates in the order x, y, z', function() {
            expect(Hex(3, -5, 2)).to.contain({ x: 3, y: -5, z: 2 })
        })

        describe('when x, y and z summed and rounded don\'t equal 0', function() {
            it('throws an error', function() {
                expect(() => Hex(3, -5, 8)).to.throw(Error, 'Coordinates don\'t sum to 0: { x: 3, y: -5, z: 8 }.')
            })
        })
    })

    describe('with 2 numbers', function() {
        it('sets the missing coordinate', function() {
            expect(Hex(3, 2, null)).to.contain({ x: 3, y: 2, z: -5 })
            expect(Hex(3, null, 2)).to.contain({ x: 3, y: -5, z: 2 })
            expect(Hex(null, 3, 2)).to.contain({ x: -5, y: 3, z: 2 })
        })
    })

    describe('with 1 number', function() {
        it('sets the first missing coordinate (in the order x, y, z) to the provided coordinate', function() {
            expect(Hex(3, null, null)).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex(null, 3, null)).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex(null, null, 3)).to.contain({ x: 3, y: -6, z: 3 })
        })
    })

    describe('with an object containing x, y and z', function() {
        it('sets the coordinates', function() {
            expect(Hex({ x: 3, y: 2, z: -5 })).to.contain({ x: 3, y: 2, z: -5 })
        })
    })

    describe('with an object containing 2 coordinates', function() {
        it('calculates the third coordinate and sets all 3', function() {
            expect(Hex({ x: 3, y: 0 })).to.contain({ x: 3, y: 0, z: -3 })
            expect(Hex({ x: 3, z: 0 })).to.contain({ x: 3, y: -3, z: 0 })
            expect(Hex({ y: 3, z: 0 })).to.contain({ x: -3, y: 3, z: 0 })
        })
    })

    describe('with an object containing 1 coordinate', function() {
        it('calculates the missing coordinates and sets all 3', function() {
            expect(Hex({ x: 3 })).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex({ y: 3 })).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex({ z: 3 })).to.contain({ x: 3, y: -6, z: 3 })
        })
    })

    describe('with an object containing no coordinate', function() {
        it('sets all coordinates to 0', function() {
            expect(Hex({})).to.contain({ x: 0, y: 0, z: 0 })
        })
    })

    describe('without parameters', function() {
        it('sets all coordinates to 0', function() {
            expect(Hex()).to.contain({ x: 0, y: 0, z: 0 })
        })
    })

    describe('with an array containing 3 numbers', function() {
        it('sets the coordinates in the order x, y, z', function() {
            expect(Hex([3, 2, -5])).to.contain({ x: 3, y: 2, z: -5 })
        })
    })

    describe('with an array containing 2 numbers', function() {
        it('calculates the third coordinate and sets all 3', function() {
            expect(Hex([3, 0])).to.contain({ x: 3, y: 0, z: -3 })
            expect(Hex([3, undefined, 0])).to.contain({ x: 3, y: -3, z: 0 })
            expect(Hex([undefined, 3, 0])).to.contain({ x: -3, y: 3, z: 0 })
        })
    })

    describe('with an array containing 1 number', function() {
        it('calculates the first missing coordinate (in the order x, y, z) and sets all 3', function() {
            expect(Hex([3])).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex([undefined, 3])).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex([undefined, undefined, 3])).to.contain({ x: 3, y: -6, z: 3 })
        })
    })

    describe('with an empty array', function() {
        it('sets all coordinates to 0', function() {
            expect(Hex([])).to.contain({ x: 0, y: 0, z: 0 })
        })
    })

    describe('with a falsy value', function() {
        it('sets all coordinates to 0', function() {
            const allZeroCoordinates = { x: 0, y: 0, z: 0 }
            expect(Hex(undefined)).to.contain(allZeroCoordinates)
            expect(Hex(null)).to.contain(allZeroCoordinates)
            expect(Hex('')).to.contain(allZeroCoordinates)
            expect(Hex(false)).to.contain(allZeroCoordinates)
        })
    })

    describe('with a hex', function() {
        it('clones the hex', function() {
            const someHex = Hex()
            const clonedHex = Hex(someHex)
            expect(clonedHex).not.to.equal(someHex)
        })
    })
})
