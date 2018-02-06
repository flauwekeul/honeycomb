/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'

import { ensureXY } from '../utils'
import extendHexFactory, { staticMethods } from '../../src/hex'
import { ORIENTATION, OFFSET } from './constants'

const ensureXYSpy = sinon.spy(ensureXY)
const extendHex = extendHexFactory({ ensureXY: ensureXYSpy })

describe('extendHex', function() {
    let Hex

    beforeEach(() => {
        Hex = extendHex()
    })

    it('returns a function', function() {
        expect(Hex).to.be.a('function')
    })

    it('returns a function that has the Hex static methods', function() {
        expect(Object.entries(Hex)).to.eql(Object.entries(staticMethods))
    })

    it('returns a function with the default prototype', function() {
        const prototype = Object.getPrototypeOf(Hex())
        const prototypeProps = Object.keys(prototype)

        expect(prototypeProps).to.eql([
            '__isHoneycombHex',

            'orientation',
            'origin',
            'size',
            'offset',
            'q',
            'r',
            's',

            'add',
            'cartesian',
            'cartesianToCube',
            'coordinates',
            'corners',
            'cube',
            'cubeToCartesian',
            'distance',
            'equals',
            'height',
            'isFlat',
            'isPointy',
            'lerp',
            'nudge',
            'oppositeCornerDistance',
            'oppositeSideDistance',
            'round',
            'set',
            'subtract',
            'toPoint',
            'toString',
            'width'
        ])
        expect(prototype).to.have.property('__isHoneycombHex', true)
        expect(prototype).to.have.property('orientation', ORIENTATION.pointy)
        expect(prototype).to.have.property('origin').that.contains({ x: 0, y: 0 })
        expect(prototype).to.have.property('size', 1)
        expect(prototype).to.have.property('offset', OFFSET.odd)
    })

    it('has getters for the q, r and s cube coordinates', () => {
        const cartesianToCube = sinon.stub().returns({ q: 'q', r: 'r', s: 's' })
        const hex = extendHex({ cartesianToCube })()

        expect(hex.q).to.equal('q')
        expect(hex.r).to.equal('r')
        expect(hex.s).to.equal('s')
        expect(() => hex.q = 1).to.throw
        expect(() => hex.r = 1).to.throw
        expect(() => hex.s = 1).to.throw
    })

    describe('when passed an object', function() {
        it(`returns a Hex factory with the object's properties merged into the default prototype`, function() {
            const prototype = {
                size: 100,
                custom: 'property'
            }
            const Hex = extendHex(prototype)
            const finalPrototype = Object.getPrototypeOf(Hex())

            expect(finalPrototype).to.have.own.property('size', 100)
            expect(finalPrototype).to.have.own.property('custom')
        })

        it(`creates a different Hex factory each time it's called`, function() {
            const Hex1 = extendHex({ size: 10 })
            const Hex2 = extendHex({ size: 20 })

            expect(Hex1().size).not.to.equal(Hex2().size)
        })
    })
})

describe('Hex creation', function() {
    let Hex

    before(function() {
        Hex = extendHex()
    })

    it('calls ensureXY', () => {
        Hex(1, 2)
        expect(ensureXYSpy).to.have.been.calledWith(1, 2)
    })

    describe('with 2 numbers', function() {
        it('sets them as x and y coordinates', function() {
            expect(Hex(3, -5)).to.contain({ x: 3, y: -5 })
        })
    })

    describe('with 1 number', function() {
        it('sets the missing coordinate to the same value as the passed coordinate', function() {
            expect(Hex(3, null)).to.contain({ x: 3, y: 3 })
            expect(Hex(null, 2)).to.contain({ x: 2, y: 2 })
        })
    })

    describe('with a 3rd argument that is an object', function() {
        it('merges the object in the hex', function() {
            expect(Hex(3, 2, { custom: 'property' })).to.contain({ x: 3, y: 2, custom: 'property' })
        })

        it('ignores any coordinates in the object', function() {
            expect(Hex(3, 2, { x: 0, y: 0 })).to.contain({ x: 3, y: 2 })
        })
    })

    describe('with an object containing x and y properties', function() {
        it('sets the coordinates', function() {
            expect(Hex({ x: 3, y: 2 })).to.contain({ x: 3, y: 2 })
        })
    })

    describe('with an object containing either an x or y coordinate', function() {
        it('sets the missing coordinate to the same value as the passed coordinate', function() {
            expect(Hex({ x: 3 })).to.contain({ x: 3, y: 3 })
            expect(Hex({ y: 2 })).to.contain({ x: 2, y: 2 })
        })
    })

    describe('with an object containing all cube coordinates (q, r and s)', () => {
        it('converts them to rectangular (x and y) coordinates', () => {
            const cubeToCartesian = sinon.stub().returns({ x: 4, y: 5 })
            const Hex = extendHex({ cubeToCartesian })
            const result = Hex({ q: 1, r: 2, s: -3 })

            expect(cubeToCartesian).to.have.been.calledWith({ q: 1, r: 2, s: -3 })
            expect(result).to.contain({ x: 4, y: 5 })
        })
    })

    describe(`with an object containing all cube coordinates (q, r and s) that don't sum to 0`, () => {
        it('throws an error', () => {
            expect(() => Hex({ q: 1, r: 2, s: 3 })).to.throw(
                `Cube coordinates must have a sum of 0. q: 1, r: 2, s: 3, sum: 6.`
            )
        })
    })

    describe('with an object containing some cube coordinates (q, r and s)', () => {
        it('throws an error', () => {
            expect(() => Hex({ q: 1 })).to.throw(
                `Cube coordinates must have a sum of 0. q: 1, r: undefined, s: undefined, sum: NaN.`
            )
        })
    })

    describe('with an object containing no coordinates', function() {
        it('sets both coordinates to 0', function() {
            expect(Hex({})).to.contain({ x: 0, y: 0 })
        })
    })

    describe('with an object containing custom properties', function() {
        it('sets the custom properties', function() {
            expect(Hex({ custom: 'property' })).to.contain({ custom: 'property' })
        })
    })

    describe('with an object and more arguments', function() {
        it('ignores all but the object', function() {
            const result = Hex({ x: 1, y: -3, custom: 'a' }, 8, { x: 0, y: 0, custom: 'b' })
            expect(result).to.contain({ x: 1, y: -3, custom: 'a' })
            expect(result).not.to.contain({ custom: 'b' })
        })
    })

    describe('without parameters', function() {
        it('sets both coordinates to 0', function() {
            expect(Hex()).to.contain({ x: 0, y: 0 })
        })
    })

    describe('with an array containing 2 numbers', function() {
        it('sets them as x and y coordinates', function() {
            expect(Hex([3, 0])).to.contain({ x: 3, y: 0 })
        })
    })

    describe('with an array containing 1 number', function() {
        it('sets the missing coordinate to the same value as the passed coordinate', function() {
            expect(Hex([3])).to.contain({ x: 3, y: 3 })
            expect(Hex([null, 2])).to.contain({ x: 2, y: 2 })
        })
    })

    describe('with an array containing more than 2 numbers', function() {
        it('ignores all but the first 2 array elements', function() {
            const result = Hex([3, 2, { custom: 'a', x: 0 }, 8])
            expect(result).to.contain({ x: 3, y: 2 })
            expect(result).not.to.contain({ custom: 'a' })
        })
    })

    describe('with an empty array', function() {
        it('sets both coordinates to 0', function() {
            expect(Hex([])).to.contain({ x: 0, y: 0 })
        })
    })

    describe('with an array and more arguments', function() {
        it('ignores all but the array', function() {
            const result = Hex([1, -3], 8, { x: 0, y: 0, custom: 'a' })
            expect(result).to.contain({ x: 1, y: -3 })
            expect(result).not.to.contain({ custom: 'a' })
        })
    })

    describe('with a falsy value', function() {
        it('sets both coordinates to 0', function() {
            const bothZeroCoordinates = { x: 0, y: 0 }
            expect(Hex(undefined)).to.contain(bothZeroCoordinates)
            expect(Hex(null)).to.contain(bothZeroCoordinates)
            expect(Hex('')).to.contain(bothZeroCoordinates)
            expect(Hex(false)).to.contain(bothZeroCoordinates)
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
