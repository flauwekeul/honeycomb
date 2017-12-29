import { expect } from 'chai'
import sinon from 'sinon'

import createGridFactoryFactory from '../../src/grid'
import createHexFactory from '../../src/hex'

const createGridFactory = createGridFactoryFactory({ createHexFactory })

describe('Grid.createFactory', function() {
    describe('when not passed a function', function() {
        it(`calls Honeycomb.Hex.createFactory() to create a default Hex factory`, function() {
            const createHexFactorySpy = sinon.spy(createHexFactory)
            const createGridFactory = createGridFactoryFactory({ createHexFactory: createHexFactorySpy })
            createGridFactory()
            expect(createHexFactorySpy).to.have.been.called
        })
    })

    it('returns a Grid factory', function() {
        const Grid = createGridFactory()
        expect(Grid).to.be.a('function')
    })
})

describe('Grid', function() {
    let Grid, Hex

    beforeEach(function() {
        Hex = createHexFactory()
        Grid = createGridFactory(Hex)
    })

    it('returns an object with the Array prototype in its prototype chain', () => {
        const instance = Grid()

        expect(Array.prototype.isPrototypeOf(instance)).to.be.true
        expect(instance).to.have.property('map').that.equals(Array.prototype.map)
    })

    it(`doesn't alter Array`, function() {
        expect(Array.prototype).not.to.have.property('pointToHex')
        expect([].pointToHex).to.be.undefined
    })

    it('returns an object with the Grid methods in its prototype chain', function() {
        const Hex = sinon.spy()
        Grid = createGridFactory(Hex)
        const prototype = Object.getPrototypeOf(Grid(Hex))
        const prototypeProps = Object.keys(prototype)

        expect(prototypeProps).to.have.length(9)
        expect(prototype).to.have.property('Hex').that.equals(Hex)
        expect(prototype).to.have.property('pointToHex').that.is.a('function')
        expect(prototype).to.have.property('hexToPoint').that.is.a('function')
        expect(prototype).to.have.property('colSize').that.is.a('function')
        expect(prototype).to.have.property('rowSize').that.is.a('function')
        expect(prototype).to.have.property('parallelogram').that.is.a('function')
        expect(prototype).to.have.property('triangle').that.is.a('function')
        expect(prototype).to.have.property('hexagon').that.is.a('function')
        expect(prototype).to.have.property('rectangle').that.is.a('function')
    })
})
