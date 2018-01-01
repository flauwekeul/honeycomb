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

    it('returns a GridFactory', function() {
        const Grid = createGridFactory()
        expect(Grid).to.be.a('function')
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

    it('binds any passed Hex function to undefined', function() {
        const boundHex = sinon.spy()
        const bindSpy = sinon.stub().returns(boundHex)
        const Hex = { bind: bindSpy }
        const Grid = createGridFactory(Hex)
        const prototype = Object.getPrototypeOf(Grid())

        expect(bindSpy).to.have.been.calledWith()
        expect(prototype).to.have.property('Hex').that.equals(boundHex)

        Grid().Hex()
        expect(boundHex).to.have.been.called
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
