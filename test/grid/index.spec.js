import { expect } from 'chai'
import sinon from 'sinon'

import createGridFactoryFactory from '../../src/grid'
import Grid from '../../src/grid/class'
import createHexFactory from '../../src/hex'

const createGridFactory = createGridFactoryFactory({ createHexFactory })
const Hex = createHexFactory()

describe('Grid.createFactory', function() {
    describe('when not passed a function', function() {
        it(`calls Honeycomb.Hex.createFactory() to create a default Hex factory`, function() {
            const createHexFactorySpy = sinon.spy(createHexFactory)
            const createGridFactory = createGridFactoryFactory({ createHexFactory: createHexFactorySpy })
            createGridFactory()
            expect(createHexFactorySpy).to.have.been.called
        })
    })

    it('returns a GridFactory with static methods', function() {
        const GridFactory = createGridFactory()
        expect(GridFactory).to.be.a('function')
        const staticProps = Object.keys(GridFactory)

        expect(staticProps).to.eql([
            'Hex',
            'isValidHex',
            'pointToHex',
            'colSize',
            'rowSize',
            'parallelogram',
            'triangle',
            'hexagon',
            'rectangle'
        ])
    })

    it('unbinds the Hex property (binds to undefined)', function() {
        const boundHex = sinon.spy()
        const bindSpy = sinon.stub().returns(boundHex)
        const Hex = { bind: bindSpy }
        const GridFactory = createGridFactory(Hex)

        expect(bindSpy).to.have.been.calledWith(/* undefined */) // passing undefined doesn't work...
        expect(GridFactory.Hex).to.equal(boundHex)

        GridFactory.Hex()
        expect(boundHex).to.have.been.called
    })
})

describe('GridFactory', function() {
    it('returns a function with the Array prototype in its prototype chain', function() {
        const instance = createGridFactory()()
        expect(Array.prototype.isPrototypeOf(instance)).to.be.true
        expect(instance).to.have.property('map').that.equals(Array.prototype.map) // ducktype
    })

    it('returns a function with the Grid prototype', function() {
        const GridFactory = createGridFactory()
        const prototype = Object.getPrototypeOf(GridFactory())
        const prototypeProps = Object.keys(prototype)

        expect(prototypeProps).to.eql([
            'get',
            'hexesBetween',
            'neighborOf',
            'neighborsOf'
        ])
    })
})

describe('Grid creation', function() {
    let GridFactory

    beforeEach(function() {
        GridFactory = createGridFactory(Hex)
        sinon.spy(Grid, 'isValidHex')
    })

    afterEach(() => {
        Grid.isValidHex.restore()
    })

    describe(`when called with one or more arguments that aren't arrays`, () => {
        it('calls Grid.isValidHex for each argument', () => {
            const hex1 = Hex()
            const hex2 = Hex(2, -4)
            GridFactory(hex1, hex2)

            expect(Grid.isValidHex).to.have.been.calledWith(hex1)
            expect(Grid.isValidHex).to.have.been.calledWith(hex2)
        })

        describe(`when they're valid hexes`, function() {
            it('returns a grid instance containing those hexes', function() {
                const hex1 = Hex()
                const hex2 = Hex(2, -4)
                const result = GridFactory(hex1, hex2)

                expect(result).to.have.lengthOf(2)
                expect(result[0]).to.equal(hex1)
                expect(result[1]).to.equal(hex2)
            })
        })

        describe(`when they're valid hexes and other types`, function() {
            it('returns a grid instance with only the valid hexes', function() {
                const hex1 = Hex()
                const hex2 = Hex(2, -4)
                const result = GridFactory(null, 'string', hex1, {}, hex2, 1)

                expect(result).to.have.lengthOf(2)
                expect(result[0]).to.equal(hex1)
                expect(result[1]).to.equal(hex2)
            })
        })
    })

    describe(`when called with an array`, () => {
        it('calls Grid.isValidHex for each element in the array', () => {
            const hex1 = Hex()
            const hex2 = Hex(2, -4)
            GridFactory([hex1, hex2])

            expect(Grid.isValidHex).to.have.been.calledWith(hex1)
            expect(Grid.isValidHex).to.have.been.calledWith(hex2)
        })

        describe('that is a valid grid', function() {
            it('returns a copy of the grid', function() {
                const grid = GridFactory(Hex(), Hex())
                const result = GridFactory(grid)

                expect(result).to.eql(grid)
                expect(result).to.not.equal(grid)
            })
        })

        describe('containing valid hexes', function() {
            it('returns a grid instance containing those hexes', function() {
                const hex1 = Hex()
                const hex2 = Hex(2, -4)
                const result = GridFactory([hex1, hex2])

                expect(result).to.have.lengthOf(2)
                expect(result[0]).to.equal(hex1)
                expect(result[1]).to.equal(hex2)
            })
        })

        describe('containing valid hexes and other types', function() {
            it('returns a grid instance with only the valid hexes', function() {
                const hex1 = Hex()
                const hex2 = Hex(2, -4)
                const result = GridFactory([null, 'string', hex1, {}, hex2, 1])

                expect(result).to.have.lengthOf(2)
                expect(result[0]).to.equal(hex1)
                expect(result[1]).to.equal(hex2)
            })
        })
    })
})
