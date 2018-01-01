import { expect } from 'chai'
import sinon from 'sinon'

import createGridFactoryFactory from '../../src/grid'
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
        const Grid = createGridFactory()
        expect(Grid).to.be.a('function')
        const staticProps = Object.keys(Grid)

        expect(staticProps).to.eql([
            'Hex',
            'pointToHex',
            'hexToPoint',
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
        const Grid = createGridFactory(Hex)

        expect(bindSpy).to.have.been.calledWith(/* undefined */) // passing undefined doesn't work...
        expect(Grid.Hex).to.equal(boundHex)

        Grid.Hex()
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
        const Grid = createGridFactory()
        const prototype = Object.getPrototypeOf(Grid())
        const prototypeProps = Object.keys(prototype)

        expect(prototypeProps).to.eql([
            '__isHoneycombGrid'
        ])
    })
})

describe('Grid creation', function() {
    let Grid

    beforeEach(function() {
        Grid = createGridFactory(Hex)
    })

    describe('when called with any number of valid hexes', function() {
        it('returns a grid instance containing those hexes', function() {
            const hex1 = Hex()
            const hex2 = Hex(2, -4)
            const result = Grid(hex1, hex2)

            expect(result).to.have.lengthOf(2)
            expect(result[0]).to.equal(hex1)
            expect(result[1]).to.equal(hex2)
        })
    })

    describe('when called with an array containing any number of valid hexes', function() {
        it('returns a grid instance containing those hexes', function() {
            const hex1 = Hex()
            const hex2 = Hex(2, -4)
            const result = Grid([hex1, hex2])

            expect(result).to.have.lengthOf(2)
            expect(result[0]).to.equal(hex1)
            expect(result[1]).to.equal(hex2)
        })
    })

    describe('when called with a valid grid', function() {
        it('returns a copy of the grid', function() {
            const grid = Grid(Hex(), Hex())
            const result = Grid(grid)

            expect(result).to.eql(grid)
            expect(result).to.not.equal(grid)
        })
    })

    describe('when called with anything but valid hexes', function() {
        it('returns an empty grid instance', function() {
            expect(Grid()).to.be.empty
            expect(Grid(undefined)).to.be.empty
            expect(Grid(null)).to.be.empty
            expect(Grid('')).to.be.empty
            expect(Grid(false)).to.be.empty
            expect(Grid('string')).to.be.empty
            expect(Grid(42)).to.be.empty
            expect(Grid([])).to.be.empty
            expect(Grid({})).to.be.empty
            expect(Grid(function(){})).to.be.empty
        })
    })

    describe('when called with an array containing anything but valid hexes', function() {
        it('returns an empty grid instance', function() {
            expect(Grid([undefined])).to.be.empty
            expect(Grid([null])).to.be.empty
            expect(Grid([''])).to.be.empty
            expect(Grid([false])).to.be.empty
            expect(Grid(['string'])).to.be.empty
            expect(Grid([42])).to.be.empty
            expect(Grid([[]])).to.be.empty
            expect(Grid([{}])).to.be.empty
            expect(Grid([function() { }])).to.be.empty
        })
    })

    describe('when called with valid hexes and other types', function() {
        it('returns a grid instance with only the valid hexes', function() {
            const hex1 = Hex()
            const hex2 = Hex(2, -4)
            const result = Grid(null, 'string', hex1, {}, hex2, 1)

            expect(result).to.have.lengthOf(2)
            expect(result[0]).to.equal(hex1)
            expect(result[1]).to.equal(hex2)
        })
    })

    describe('when called with an array containing valid hexes and other types', function() {
        it('returns a grid instance with only the valid hexes', function() {
            const hex1 = Hex()
            const hex2 = Hex(2, -4)
            const result = Grid([null, 'string', hex1, {}, hex2, 1])

            expect(result).to.have.lengthOf(2)
            expect(result[0]).to.equal(hex1)
            expect(result[1]).to.equal(hex2)
        })
    })
})
