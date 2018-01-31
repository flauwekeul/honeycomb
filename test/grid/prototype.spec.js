import { expect } from 'chai'
import sinon from 'sinon'

import { signedModulo, compassToNumberDirection } from '../../src/utils'
import createHexFactory from '../../src/hex'
import createGridFactoryFactory from '../../src/grid'
import * as methods from '../../src/grid/prototype'

const Hex = createHexFactory()
const GridFactory = createGridFactoryFactory({ createHexFactory })(Hex)

describe('get', () => {
    describe('when present in the grid', () => {
        it('returns the passed hex', () => {
            const targetHex = Hex(3, -2)
            const get = methods.get.bind(GridFactory(targetHex))
            const result = get(Hex(3, -2))

            expect(result).to.equal(targetHex)
        })
    })

    describe('when not present in the grid', () => {
        it('returns the passed hex', () => {
            const targetHex = Hex(3, -2)
            const get = methods.get.bind(GridFactory(targetHex))
            const result = get(Hex())

            expect(result).to.be.undefined
        })
    })
})

describe('hexesBetween', () => {
    it('calls the passed firstHex.distance()', () => {
        const distance = sinon.stub()
        const firstHex = { distance }
        const lastHex = 'last hex'
        methods.hexesBetween(firstHex, lastHex)

        expect(distance).to.have.been.calledWith(lastHex)
    })

    it('calls firstHex.nudge(), firstHex.lerp(), lastHex.nudge() and firstHex.round() for each hex between firstHex and lastHex', () => {
        const round = sinon.stub().returns('round result')
        const lerp = sinon.stub().returns({ round })
        const firstHexNudge = sinon.stub().returns({ lerp })
        const lastHexNudge = sinon.stub().returns('last hex nudge result')
        const distance = sinon.stub().returns(2)
        const firstHex = { distance, nudge: firstHexNudge }
        const lastHex = { nudge: lastHexNudge }
        const get = sinon.stub().returns('get result')
        const hexesBetween = methods.hexesBetween.bind({ get })
        const result = hexesBetween(firstHex, lastHex)

        expect(firstHexNudge).to.have.callCount(3)
        expect(lerp).to.have.callCount(3)
        expect(lerp).to.always.have.been.calledWith('last hex nudge result', sinon.match.number)
        expect(lastHexNudge).to.have.callCount(3)
        expect(round).to.have.callCount(3)
        expect(get).to.have.callCount(3)
        expect(get).to.always.have.been.calledWith('round result')
        expect(result).to.eql(['get result', 'get result', 'get result'])
    })

    describe('when all hexes between firstHex and lastHex are present in the grid', () => {
        it('returns the hexes in a straight line, inclusive', () => {
            const grid = GridFactory.rectangle({ width: 4, height: 2 })
            const result = grid.hexesBetween(Hex(), Hex(3, 1))

            expect(result).to.be.an('array').that.has.a.lengthOf(5)
            expect(result[0]).to.equal(grid[0])
            expect(result[1]).to.equal(grid[1])
            expect(result[2]).to.equal(grid[2])
            expect(result[3]).to.equal(grid[6])
            expect(result[4]).to.equal(grid[7])
        })
    })

    describe('when some hexes between firstHex and lastHex are missing in the grid', () => {
        it('returns any present hexes in a straight line, inclusive', () => {
            const grid = GridFactory.rectangle({ width: 3, height: 2 })
            const firstHex = Hex()
            const lastHex = Hex(3, 1)
            const result = grid.hexesBetween(firstHex, lastHex)

            expect(result).to.be.an('array').that.has.a.lengthOf(5)
            expect(result[0]).to.equal(grid[0])
            expect(result[1]).to.equal(grid[1])
            expect(result[2]).to.equal(grid[2])
            expect(result[3]).to.equal(grid[5])
            expect(result[4]).to.be.undefined
        })
    })
})

describe('neighborsOf', () => {
    let neighborsOf, signedModuloSpy, compassToNumberDirectionSpy, cubeToCartesian, hex, get

    beforeEach(() => {
        signedModuloSpy = sinon.spy(signedModulo)
        compassToNumberDirectionSpy = sinon.spy(compassToNumberDirection)
        cubeToCartesian = sinon.stub().returns('cubeToCartesian result')
        hex = { cubeToCartesian, q: 1, r: 1 }
        get = sinon.spy()
        neighborsOf = methods.neighborsOfFactory({
            signedModulo: signedModuloSpy,
            compassToNumberDirection: compassToNumberDirectionSpy
        }).bind({ get })
    })

    afterEach(() => {
        cubeToCartesian.reset()
    })

    it('throws when no hex is passed', () => {
        expect(() => neighborsOf()).to.throw(`Cannot find neighbors of hex: undefined.`)
    })

    it('accepts 3 parameters', () => {
        neighborsOf(hex, [2, 4], true)
        expect(cubeToCartesian.getCall(0)).to.have.been.calledWith({ q: 0, r: 3 })
        expect(cubeToCartesian.getCall(1)).to.have.been.calledWith({ q: 0, r: 0 })
    })

    describe('when passed an options object', () => {
        it('accepts multiple directions', () => {
            neighborsOf({ hex, directions: [2, 4], diagonal: true })
            expect(cubeToCartesian.getCall(0)).to.have.been.calledWith({ q: 0, r: 3 })
            expect(cubeToCartesian.getCall(1)).to.have.been.calledWith({ q: 0, r: 0 })
        })

        it('accepts a single direction', () => {
            neighborsOf({ hex, direction: 2, diagonal: true })
            expect(cubeToCartesian.getCall(0)).to.have.been.calledWith({ q: 0, r: 3 })
        })

        it('ignores the single direction when multiple directions are also given', () => {
            neighborsOf({ hex, directions: [1, 3], direction: 2, diagonal: true })
            expect(cubeToCartesian.callCount).to.equal(2)
        })
    })

    it('calls grid.get() with the result of hex.cubeToCartesian() for each direction', () => {
        neighborsOf(hex)
        expect(get.callCount).to.equal(6)
        expect(get).to.always.have.been.calledWith('cubeToCartesian result')
    })

    describe(`when called with no direction or 'all' directions`, () => {
        it(`calls the passed hex.cubeToCartesian() with the sum of the passed hex's cube coordinates and all direction coordinates`, () => {
            neighborsOf(hex)
            expect(cubeToCartesian.getCall(0).args[0]).to.eql({ q: 2, r: 1 })
            expect(cubeToCartesian.getCall(1).args[0]).to.eql({ q: 1, r: 2 })
            expect(cubeToCartesian.getCall(2).args[0]).to.eql({ q: 0, r: 2 })
            expect(cubeToCartesian.getCall(3).args[0]).to.eql({ q: 0, r: 1 })
            expect(cubeToCartesian.getCall(4).args[0]).to.eql({ q: 1, r: 0 })
            expect(cubeToCartesian.getCall(5).args[0]).to.eql({ q: 2, r: 0 })

            cubeToCartesian.reset()

            neighborsOf(hex, 'all')
            expect(cubeToCartesian.getCall(0).args[0]).to.eql({ q: 2, r: 1 })
            expect(cubeToCartesian.getCall(1).args[0]).to.eql({ q: 1, r: 2 })
            expect(cubeToCartesian.getCall(2).args[0]).to.eql({ q: 0, r: 2 })
            expect(cubeToCartesian.getCall(3).args[0]).to.eql({ q: 0, r: 1 })
            expect(cubeToCartesian.getCall(4).args[0]).to.eql({ q: 1, r: 0 })
            expect(cubeToCartesian.getCall(5).args[0]).to.eql({ q: 2, r: 0 })
        })
    })

    describe('when called with directions outside 0..5', () => {
        it(`passed them to signedModulo`, () => {
            neighborsOf(hex, -1)
            expect(signedModuloSpy).to.have.been.calledWith(-1, 6)

            signedModuloSpy.reset()

            neighborsOf(hex, 3)
            expect(signedModuloSpy).not.to.have.been.called
        })
    })

    describe('when called with a single number direction', () => {
        it(`calls the passed hex.cubeToCartesian() with the sum of the passed hex's cube coordinates and the passed direction coordinate`, () => {
            neighborsOf(hex, 2)
            expect(cubeToCartesian.callCount).to.equal(1)
            expect(cubeToCartesian.getCall(0).args[0]).to.eql({ q: 0, r: 2 })

            cubeToCartesian.reset()

            neighborsOf({ hex, direction: 2 })
            expect(cubeToCartesian.callCount).to.equal(1)
            expect(cubeToCartesian.getCall(0).args[0]).to.eql({ q: 0, r: 2 })
        })
    })

    describe('when called with compass direction(s)', () => {
        it('calls compassToNumberDirection', () => {
            hex.orientation = 'pointy'
            neighborsOf(hex, 'NW')

            expect(compassToNumberDirectionSpy).to.have.been.calledWith('NW', 'pointy')
        })
    })

    describe('with the diagonal flag enabled', () => {
        it(`calls the passed hex.cubeToCartesian() with the sum of the passed hex's cube coordinates and all direction coordinates`, () => {
            neighborsOf(hex, 'all', true)
            expect(cubeToCartesian.getCall(0).args[0]).to.eql({ q: 3, r: 0 })
            expect(cubeToCartesian.getCall(1).args[0]).to.eql({ q: 2, r: 2 })
            expect(cubeToCartesian.getCall(2).args[0]).to.eql({ q: 0, r: 3 })
            expect(cubeToCartesian.getCall(3).args[0]).to.eql({ q: -1, r: 2 })
            expect(cubeToCartesian.getCall(4).args[0]).to.eql({ q: 0, r: 0 })
            expect(cubeToCartesian.getCall(5).args[0]).to.eql({ q: 2, r: -1 })
        })
    })

    describe('when all neighbors are present in the grid', () => {
        it('returns all neighbors', () => {
            const grid = GridFactory.hexagon({ radius: 1 })
            const result = grid.neighborsOf(Hex())

            expect(result).to.be.an('array').that.has.a.lengthOf(6)
            expect(result[0]).to.equal(grid[6])
            expect(result[1]).to.equal(grid[4])
            expect(result[2]).to.equal(grid[1])
            expect(result[3]).to.equal(grid[0])
            expect(result[4]).to.equal(grid[2])
            expect(result[5]).to.equal(grid[5])
        })
    })

    describe('when some neighbors are present in the grid', () => {
        it('returns only the present neighbors', () => {
            const grid = GridFactory.hexagon({ radius: 1 })
            const hex = Hex(1, 0)
            const result = grid.neighborsOf(hex)

            expect(result).to.be.an('array').that.has.a.lengthOf(3)
            expect(result[0]).to.equal(grid[4])
            expect(result[1]).to.equal(grid[3])
            expect(result[2]).to.equal(grid[5])
        })
    })
})
