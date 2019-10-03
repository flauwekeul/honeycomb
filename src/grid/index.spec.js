/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'
import extendHexFactory from '../hex'
import PointFactory from '../point'
import { ensureXY, normalizeRadiuses } from '../utils'
import defineGridFactory from './'
import Grid from './class'

const Point = PointFactory({ ensureXY })
const extendHex = extendHexFactory({ ensureXY, normalizeRadiuses, Point })
const defineGrid = defineGridFactory({ extendHex, Grid, Point })
const Hex = extendHex()

describe('defineGrid', function() {
  describe('when not passed a function', function() {
    it(`calls Honeycomb.extendHex() to create a default Hex factory`, function() {
      const extendHexSpy = sinon.spy(extendHex)
      const defineGrid = defineGridFactory({ extendHex: extendHexSpy, Grid, Point })
      defineGrid()
      expect(extendHexSpy).to.have.been.called
    })
  })

  it('returns a GridFactory with static methods', function() {
    const GridFactory = defineGrid()
    expect(GridFactory).to.be.a('function')
    const staticProps = Object.keys(GridFactory)

    expect(staticProps).to.eql([
      'Hex',
      'isValidHex',
      'pointToHex',
      'parallelogram',
      'triangle',
      'hexagon',
      'rectangle',
      'ring',
    ])
    expect(GridFactory.isValidHex).to.eql(Grid.isValidHex)
  })
})

describe('GridFactory', function() {
  it('returns a function with the Array prototype in its prototype chain', function() {
    const instance = defineGrid()()
    expect(Array.prototype.isPrototypeOf(instance)).to.be.true
    expect(instance)
      .to.have.property('map')
      .that.equals(Array.prototype.map) // ducktype
  })

  it('returns a function with the Grid prototype', function() {
    const GridFactory = defineGrid()
    const prototype = Object.getPrototypeOf(GridFactory())
    const prototypeProps = Object.keys(prototype)

    expect(prototypeProps).to.eql([
      'get',
      'hexesBetween',
      'hexesInRange',
      'neighborsOf',
      'pointHeight',
      'pointWidth',
      'set',
    ])
  })
})

describe('Grid creation', function() {
  let GridFactory

  beforeEach(function() {
    GridFactory = defineGridFactory({ extendHex, Grid, Point })(Hex)
  })

  describe('when called with a single point', () => {
    it('returns a grid with a single hex', () => {
      const grid1 = GridFactory([0, 0])
      expect(grid1).to.have.lengthOf(1)
      expect(grid1[0]).to.eql(Hex(0, 0))

      const grid2 = GridFactory({ x: 0, y: 0 })
      expect(grid2).to.have.lengthOf(1)
      expect(grid2[0]).to.eql(Hex(0, 0))
    })
  })

  describe('when called with multiple points as separate arguments', () => {
    it('returns a grid with as many hexes', () => {
      const grid1 = GridFactory([0, 0], [1, 1])
      expect(grid1).to.have.lengthOf(2)
      expect(grid1[0]).to.eql(Hex(0, 0))
      expect(grid1[1]).to.eql(Hex(1, 1))

      const grid2 = GridFactory({ x: 0, y: 0 }, { x: 1, y: 1 })
      expect(grid2).to.have.lengthOf(2)
      expect(grid2[0]).to.eql(Hex(0, 0))
      expect(grid2[1]).to.eql(Hex(1, 1))
    })
  })

  describe('when called with an array of points', () => {
    it('returns a grid with as many hexes', () => {
      const grid1 = GridFactory([[0, 0], [1, 1]])
      expect(grid1).to.have.lengthOf(2)
      expect(grid1[0]).to.eql(Hex(0, 0))
      expect(grid1[1]).to.eql(Hex(1, 1))

      const grid2 = GridFactory([{ x: 0, y: 0 }, { x: 1, y: 1 }])
      expect(grid2).to.have.lengthOf(2)
      expect(grid2[0]).to.eql(Hex(0, 0))
      expect(grid2[1]).to.eql(Hex(1, 1))
    })
  })

  describe('when called with a single hex', () => {
    it('returns a grid with a single hex', () => {
      const grid = GridFactory(Hex(0, 0))
      expect(grid).to.have.lengthOf(1)
      expect(grid[0]).to.eql(Hex(0, 0))
    })
  })

  describe('when called with multiple hexes as separate arguments', () => {
    it('returns a grid with as many hexes', () => {
      const grid = GridFactory(Hex(0, 0), Hex(1, 1))
      expect(grid).to.have.lengthOf(2)
      expect(grid[0]).to.eql(Hex(0, 0))
      expect(grid[1]).to.eql(Hex(1, 1))
    })
  })

  describe('when called with an array of hexes', () => {
    it('returns a grid with as many hexes', () => {
      const grid = GridFactory([Hex(0, 0), Hex(1, 1)])
      expect(grid).to.have.lengthOf(2)
      expect(grid[0]).to.eql(Hex(0, 0))
      expect(grid[1]).to.eql(Hex(1, 1))
    })
  })

  describe('when called without arguments or a falsy argument', () => {
    it('returns an empty grid', () => {
      expect(GridFactory()).to.have.lengthOf(0)
      expect(GridFactory(undefined)).to.have.lengthOf(0)
      expect(GridFactory(null)).to.have.lengthOf(0)
      expect(GridFactory(0)).to.have.lengthOf(0)
      expect(GridFactory('')).to.have.lengthOf(0)
    })
  })

  describe('when called with an empty array', () => {
    it('returns an empty grid', () => {
      expect(GridFactory([])).to.have.lengthOf(0)
    })
  })
})
