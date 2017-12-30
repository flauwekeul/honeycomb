import { expect } from 'chai'
import sinon from 'sinon'

import createGridFactoryFactory from '../../src/grid'
import extendHex from '../../src/hex'

describe('Grid.createFactory', function() {
    describe('when not passed a function', function() {
        it('calls extendHex() to create a default Hex factory', function() {
            const extendHexSpy = sinon.spy(extendHex)
            const createFactory = createGridFactoryFactory({ extendHex: extendHexSpy })
            createFactory()
            expect(extendHexSpy).to.have.been.called
        })
    })

    it('returns a Grid factory', function() {
        const createFactory = createGridFactoryFactory({ extendHex })
        const Grid = createFactory()
        expect(Grid).to.be.a('function')
    })
})

describe('Grid', function() {
    let Grid, Hex

    beforeEach(function() {
        Hex = extendHex()
        Grid = createGridFactoryFactory({ extendHex })(Hex)
    })

    it('returns an object with the Grid methods', function() {
        const result = Grid()
        const properties = Object.keys(result).length

        expect(result).to.be.an('object')
        expect(properties).to.equal(9)
        expect(result).to.have.property('Hex').that.eqls(Hex)
        expect(result).to.have.property('pointToHex')
        expect(result).to.have.property('hexToPoint')
        expect(result).to.have.property('colSize')
        expect(result).to.have.property('rowSize')
        expect(result).to.have.property('parallelogram')
        expect(result).to.have.property('triangle')
        expect(result).to.have.property('hexagon')
        expect(result).to.have.property('rectangle')
    })
})
