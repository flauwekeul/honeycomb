import { expect } from 'chai'
import sinon from 'sinon'

import Grid from '../../src/grid/class'
import createHexFactory from '../../src/hex'

const Hex = createHexFactory()

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
        beforeEach(() => {
            sinon.stub(Grid, 'isValidHex').returns(true)
        })

        afterEach(() => {
            Grid.isValidHex.restore()
        })

        it('calls Grid.isValidHex', () => {
            instance.includes('value')
            expect(Grid.isValidHex).to.have.been.calledWith('value')
        })

        describe('when Grid.isValidHex returns false', () => {
            it('returns false', () => {
                Grid.isValidHex.returns(false)
                expect(instance.includes()).to.be.false
            })
        })

        describe(`when called with a hex that's present in the grid`, () => {
            it('returns true', () => {
                expect(instance.includes(Hex(0))).to.be.true
            })
        })

        describe(`when called with a hex that's not present in the grid`, () => {
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
        beforeEach(() => {
            sinon.stub(Grid, 'isValidHex').returns(true)
        })

        afterEach(() => {
            Grid.isValidHex.restore()
        })

        it('calls Grid.isValidHex', () => {
            instance.indexOf('value')
            expect(Grid.isValidHex).to.have.been.calledWith('value')
        })

        describe('when Grid.isValidHex returns false', () => {
            it('returns -1', () => {
                Grid.isValidHex.returns(false)
                expect(instance.indexOf()).to.equal(-1)
            })
        })

        describe(`when called with a hex that's present in the grid`, () => {
            it('returns its index', () => {
                expect(instance.indexOf(Hex(0))).to.equal(0)
            })
        })

        describe(`when called with a hex that's not present in the grid`, () => {
            it('returns -1', () => {
                expect(instance.indexOf(Hex(1))).to.equal(-1)
            })
        })

        describe('when called with start index', () => {
            it('starts searching from that index', () => {
                instance = new Grid(Hex(0), Hex(1))
                expect(instance.indexOf(Hex(0), 1)).to.equal(-1)
                expect(instance.indexOf(Hex(1), 1)).to.equal(1)
            })
        })
    })

    describe('Grid#lastIndexOf', () => {
        it('calls Grid#indexOf', () => {
            sinon.spy(instance, 'indexOf')

            instance.lastIndexOf('searchHex', 'fromIndex')
            expect(instance.indexOf).to.have.been.calledWith('searchHex', 'fromIndex')

            instance.indexOf.restore()
        })
    })
})
