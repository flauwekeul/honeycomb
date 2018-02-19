/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'

import { ensureXY } from '../utils'
import Grid from './class'
import extendHexFactory from '../hex'
import PointFactory from '../point'

const Point = PointFactory({ ensureXY })
const Hex = extendHexFactory({ ensureXY, Point })()

describe('Grid class', () => {
    let instance

    beforeEach(() => {
        instance = new Grid(Hex(0))
    })

    it('extends Array', () => {
        expect(new Grid()).to.be.an.instanceOf(Array)
    })

    describe('Grid.isValidHex', () => {
        it('returns whether the passed value has the __isHoneycombHex property', () => {
            expect(Grid.isValidHex(Hex())).to.be.true

            expect(Grid.isValidHex()).to.be.false
            expect(Grid.isValidHex(undefined)).to.be.false
            expect(Grid.isValidHex(null)).to.be.false
            expect(Grid.isValidHex(42)).to.be.false
            expect(Grid.isValidHex('string')).to.be.false
            expect(Grid.isValidHex([])).to.be.false
            expect(Grid.isValidHex({})).to.be.false
            expect(Grid.isValidHex(true)).to.be.false
        })
    })

    describe('Grid#fill', () => {
        it('throws an error', () => {
            expect(() => instance.fill()).to.throw(TypeError, 'Grid.prototype.fill is not implemented')
        })
    })

    describe('Grid#includes', () => {
        it('accepts a point', () => {
            expect(instance.includes([0, 0])).to.be.true
            expect(instance.includes({ x: 0, y: 0 })).to.be.true
        })

        describe(`when called with a point that's present in the grid`, () => {
            it('returns true', () => {
                expect(instance.includes(Hex(0))).to.be.true
            })
        })

        describe(`when called with a point that's not present in the grid`, () => {
            it('returns false', () => {
                expect(instance.includes(Hex(1))).to.be.false
            })
        })

        describe('when called with start index', () => {
            it('starts searching from that index', () => {
                instance = new Grid(Hex(0), Hex(1))
                expect(instance.includes(Hex(0), 1)).to.be.false
                expect(instance.includes(Hex(1), 1)).to.be.true
            })
        })
    })

    describe('Grid#indexOf', () => {
        it('accepts a point', () => {
            expect(instance.indexOf([0, 0])).to.equal(0)
            expect(instance.indexOf({ x: 0, y: 0 })).to.equal(0)
        })

        describe(`when called with a hex-like that's present in the grid`, () => {
            it('returns its index (from the left)', () => {
                instance = new Grid(Hex(0), Hex(1), Hex(0))
                expect(instance.indexOf({ x: 0, y: 0 })).to.equal(0)
                expect(instance.indexOf({ x: 1, y: 1 })).to.equal(1)
            })
        })

        describe(`when called with a hex-like that's not present in the grid`, () => {
            it('returns -1', () => {
                expect(instance.indexOf({ x: 1, y: 1 })).to.equal(-1)
            })
        })

        describe('when called with start index', () => {
            it('starts searching from that index', () => {
                instance = new Grid(Hex(0), Hex(1), Hex(0))
                expect(instance.indexOf(Hex(0), 1)).to.equal(2)
                expect(instance.indexOf(Hex(0), 2)).to.equal(2)
                expect(instance.indexOf(Hex(0), -1)).to.equal(2)
                expect(instance.indexOf(Hex(0), -2)).to.equal(2)
                expect(instance.indexOf(Hex(0), -3)).to.equal(0)
                expect(instance.indexOf(Hex(1), 1)).to.equal(1)
                expect(instance.indexOf(Hex(1), 2)).to.equal(-1)
                expect(instance.indexOf(Hex(1), -1)).to.equal(-1)
                expect(instance.indexOf(Hex(1), -2)).to.equal(1)
                expect(instance.indexOf(Hex(1), -3)).to.equal(1)
            })
        })
    })

    describe('Grid#lastIndexOf', () => {
        it('accepts a point', () => {
            expect(instance.lastIndexOf([0, 0])).to.equal(0)
            expect(instance.lastIndexOf({ x: 0, y: 0 })).to.equal(0)
        })

        describe(`when called with a hex-like that's present in the grid`, () => {
            it('returns its index (from the right)', () => {
                instance = new Grid(Hex(0), Hex(1), Hex(0))
                expect(instance.lastIndexOf({ x: 0, y: 0 })).to.equal(2)
                expect(instance.lastIndexOf({ x: 1, y: 1 })).to.equal(1)
            })
        })

        describe(`when called with a hex-like that's not present in the grid`, () => {
            it('returns -1', () => {
                expect(instance.lastIndexOf(Hex(1))).to.equal(-1)
            })
        })

        describe('when called with start index', () => {
            it('starts searching back from that index', () => {
                instance = new Grid(Hex(0), Hex(1), Hex(0))
                expect(instance.lastIndexOf(Hex(0), 1)).to.equal(0)
                expect(instance.lastIndexOf(Hex(0), 2)).to.equal(2)
                expect(instance.lastIndexOf(Hex(0), -1)).to.equal(2)
                expect(instance.lastIndexOf(Hex(0), -2)).to.equal(0)
                expect(instance.lastIndexOf(Hex(0), -3)).to.equal(0)
                expect(instance.lastIndexOf(Hex(1), 1)).to.equal(1)
                expect(instance.lastIndexOf(Hex(1), 2)).to.equal(1)
                expect(instance.lastIndexOf(Hex(1), -1)).to.equal(1)
                expect(instance.lastIndexOf(Hex(1), -2)).to.equal(1)
                expect(instance.lastIndexOf(Hex(1), -3)).to.equal(-1)
            })
        })
    })

    describe('Grid#push', () => {
        afterEach(() => {
            Grid.isValidHex.restore()
        })

        it('calls Grid.isValidHex', () => {
            sinon.spy(Grid, 'isValidHex')
            instance.push('value')

            expect(Grid.isValidHex).to.have.been.calledWith('value')
        })

        it('pushes only elements that are valid hexes', () => {
            instance = new Grid()
            const isValidHex = sinon.stub(Grid, 'isValidHex')

            isValidHex.withArgs('valid').returns(true)
            isValidHex.withArgs('invalid').returns(false)
            instance.push('valid', 'invalid')

            expect(instance).to.eql(['valid'])
        })
    })

    describe('Grid#splice', () => {
        it('calls Grid.isValidHex', () => {
            sinon.spy(Grid, 'isValidHex')
            instance.splice(0, 0, 'value')

            expect(Grid.isValidHex).to.have.been.calledWith('value')

            Grid.isValidHex.restore()
        })

        describe('when called with only a start', () => {
            it('deletes hexes beginning at start and returns the deleted hexes', () => {
                instance = new Grid(Hex(0), Hex(1), Hex(2))
                const result = instance.splice(1)

                expect(instance).to.eql([Hex(0)])
                expect(result).to.eql([Hex(1), Hex(2)])
            })
        })

        describe('when called with any elements to add', () => {
            it('only adds those that are valid hexes', () => {
                instance = new Grid(Hex(0), Hex(1), Hex(2))
                const isValidHex = sinon.stub(Grid, 'isValidHex')

                isValidHex.withArgs('valid').returns(true)
                isValidHex.withArgs('invalid').returns(false)
                const result = instance.splice(1, 2, 'valid', 'invalid')

                expect(instance).to.eql([Hex(0), 'valid'])
                expect(result[0]).to.eql(Hex(1))
                expect(result[1]).to.eql(Hex(2))

                Grid.isValidHex.restore()
            })
        })
    })

    describe('Grid#unshift', () => {
        afterEach(() => {
            Grid.isValidHex.restore()
        })

        it('calls Grid.isValidHex', () => {
            sinon.spy(Grid, 'isValidHex')
            instance.unshift('value')

            expect(Grid.isValidHex).to.have.been.calledWith('value')
        })

        it('adds only elements to the end of the grid that are valid hexes', () => {
            instance = new Grid()
            const isValidHex = sinon.stub(Grid, 'isValidHex')

            isValidHex.withArgs('valid').returns(true)
            isValidHex.withArgs('invalid').returns(false)
            instance.unshift('valid', 'invalid')

            expect(instance).to.eql(['valid'])
        })
    })
})
