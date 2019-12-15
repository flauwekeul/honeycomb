/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'
import PointFactory from '../point'
import { ensureXY, normalizeRadiuses } from '../utils'
import extendHexFactory from './'
import * as methods from './prototype'

const Point = PointFactory({ ensureXY })
const extendHex = extendHexFactory({ ensureXY, normalizeRadiuses, Point })
const Hex = extendHex()

describe('set', () => {
  let HexSpy, set

  beforeEach(function() {
    HexSpy = sinon.spy(Hex)
    set = methods.setFactory({ Hex: HexSpy })
  })

  it('passes any arguments to the Hex() factory', () => {
    set.call({}, 1, 2)
    expect(HexSpy).to.have.been.calledWithExactly(1, 2)

    set.call({}, { x: 1, y: 2 })
    expect(HexSpy).to.have.been.calledWithExactly({ x: 1, y: 2 })

    set.call({}, 'invalid argument')
    expect(HexSpy).to.have.been.calledWithExactly('invalid argument')
  })

  it('merges the return value of Hex() into itself', () => {
    const self = { x: 1, y: 2 }

    set.call(self, { x: 5, y: -2 })
    expect(self).to.eql({ x: 5, y: -2 })

    set.call(self)
    expect(self).to.eql({ x: 0, y: 0 })
  })

  it('returns itself', () => {
    const self = { x: 1, y: 2 }
    const result = set.call(self)

    expect(result).to.equal(self)
  })
})

describe('coordinates', function() {
  it(`returns the hex's x and y coordinates`, function() {
    const boundCoordinates = methods.coordinates.bind({ x: 8, y: -3 })
    expect(boundCoordinates()).to.eql({ x: 8, y: -3 })
  })
})

describe('cubeToCartesian', () => {
  describe('when the hex has a pointy orientation', () => {
    it('converts the passed cube coordinates to cartesian coordinates', () => {
      const isPointy = sinon.stub().returns(true)
      let cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: -1 })
      expect(cubeToCartesian({ q: 2, r: 1, s: -3 })).to.eql({ x: 2, y: 1 })
      cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: 1 })
      expect(cubeToCartesian({ q: 2, r: 1, s: -3 })).to.eql({ x: 3, y: 1 })
    })
  })

  describe('when the hex has a flat orientation', () => {
    it('converts the passed cube coordinates to cartesian coordinates', () => {
      const isPointy = sinon.stub().returns(false)
      let cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: -1 })
      expect(cubeToCartesian({ q: 1, r: 1, s: -2 })).to.eql({ x: 1, y: 1 })
      cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: 1 })
      expect(cubeToCartesian({ q: 1, r: 1, s: -2 })).to.eql({ x: 1, y: 2 })
    })
  })
})

describe('cartesianToCube', () => {
  let cartesianToCube, PointSpy, isPointy

  beforeEach(() => {
    PointSpy = sinon.spy(Point)
    isPointy = sinon.stub()
    cartesianToCube = methods.cartesianToCubeFactory({ Point: PointSpy })
  })

  it('calls Point with the passed parameters', () => {
    cartesianToCube = cartesianToCube.bind({ isPointy })

    cartesianToCube(1, 2)
    expect(PointSpy).to.have.been.calledWith(1, 2)

    cartesianToCube({ x: 1, y: 2 })
    expect(PointSpy).to.have.been.calledWith({ x: 1, y: 2 })

    cartesianToCube([1, 2])
    expect(PointSpy).to.have.been.calledWith([1, 2])

    cartesianToCube(1)
    expect(PointSpy).to.have.been.calledWith(1)
  })

  describe('when the hex has a pointy orientation', () => {
    it('converts the passed cartesian coordinates to cube coordinates', () => {
      isPointy.returns(true)
      expect(cartesianToCube.call({ isPointy, offset: -1 }, { x: 2, y: 1 })).to.eql({ q: 2, r: 1, s: -3 })
      expect(cartesianToCube.call({ isPointy, offset: 1 }, { x: 2, y: 1 })).to.eql({ q: 1, r: 1, s: -2 })
    })
  })

  describe('when the hex has a flat orientation', () => {
    it('converts the passed cartesian coordinates to cube coordinates', () => {
      isPointy.returns(false)
      expect(cartesianToCube.call({ isPointy, offset: -1 }, { x: 1, y: 1 })).to.eql({ q: 1, r: 1, s: -2 })
      expect(cartesianToCube.call({ isPointy, offset: 1 }, { x: 1, y: 1 })).to.eql({ q: 1, r: 0, s: -1 })
    })
  })
})

describe('isPointy', function() {
  it('returns whether the hex has a pointy orientation', function() {
    let isPointy = methods.isPointy.bind({ orientation: 'pointy' })
    expect(isPointy()).to.be.true
    isPointy = methods.isPointy.bind({ orientation: 'pointy' })
    expect(isPointy()).to.be.true
    isPointy = methods.isPointy.bind({ orientation: 'flat' })
    expect(isPointy()).to.be.false
  })
})

describe('isFlat', function() {
  it('returns whether the hex has a flat orientation', function() {
    let isFlat = methods.isFlat.bind({ orientation: 'flat' })
    expect(isFlat()).to.be.true
    isFlat = methods.isFlat.bind({ orientation: 'flat' })
    expect(isFlat()).to.be.true
    isFlat = methods.isFlat.bind({ orientation: 'pointy' })
    expect(isFlat()).to.be.false
  })
})

describe('width', function() {
  let isPointy

  beforeEach(() => {
    isPointy = sinon.stub(methods, 'isPointy')
  })
  afterEach(() => {
    methods.isPointy.restore()
  })

  describe('when the hex has a pointy orientation', function() {
    it('returns Hex.oppositeSideDistance()', function() {
      isPointy.returns(true)

      const result = methods.width.call({ size: { xRadius: 1 }, isPointy })
      expect(result).to.eql(Math.sqrt(3))
    })
  })

  describe('when the hex has a flat orientation', function() {
    it('returns Hex.oppositeCornerDistance()', function() {
      isPointy.returns(false)

      const result = methods.width.call({ size: { xRadius: 1 }, isPointy })
      expect(result).to.eql(2)
    })
  })
})

describe('height', function() {
  let isPointy

  beforeEach(() => {
    isPointy = sinon.stub(methods, 'isPointy')
  })
  afterEach(() => {
    methods.isPointy.restore()
  })

  describe('when the hex has a pointy orientation', function() {
    it('returns Hex.oppositeCornerDistance()', function() {
      isPointy.returns(true)

      const result = methods.height.call({ size: { yRadius: 1 }, isPointy })
      expect(result).to.eql(2)
    })
  })

  describe('when the hex has a flat orientation', function() {
    it('returns Hex.oppositeSideDistance()', function() {
      isPointy.returns(false)

      const result = methods.height.call({ size: { yRadius: 1 }, isPointy })
      expect(result).to.eql(Math.sqrt(3))
    })
  })
})

describe('corners', function() {
  let width, height, isPointy, Point, corners, context

  beforeEach(function() {
    width = sinon.stub().returns(2)
    height = sinon.stub().returns(2)
    isPointy = sinon.stub()
    Point = sinon.stub().callsFake((x, y) => ({ x, y }))
    corners = methods.cornersFactory({ Point })
    context = {
      origin: {},
      width,
      height,
      isPointy,
    }
  })

  it(`calls the hex's witdh(), height() and isPointy() methods`, function() {
    corners.call(context)
    expect(width).to.have.been.called
    expect(height).to.have.been.called
    expect(isPointy).to.have.been.called
  })

  describe('when the hex has a pointy orientation', function() {
    beforeEach(function() {
      isPointy.returns(true)
    })

    it('returns an array of 6 corners relative to origin', function() {
      context.origin = { x: 1, y: 1 }
      const result = corners.call(context)

      expect(result).to.have.lengthOf(6)
      expect(Point.getCall(0).args).to.eql([1, -0.5])
      expect(Point.getCall(1).args).to.eql([1, 0.5])
      expect(Point.getCall(2).args).to.eql([0, 1])
      expect(Point.getCall(3).args).to.eql([-1, 0.5])
      expect(Point.getCall(4).args).to.eql([-1, -0.5])
      expect(Point.getCall(5).args).to.eql([0, -1])
    })
  })

  describe('when the hex has a flat orientation', function() {
    beforeEach(function() {
      isPointy.returns(false)
    })

    it('returns an array of 6 corners relative to origin', function() {
      context.origin = { x: 1, y: 1 }
      const result = corners.call(context)

      expect(result).to.have.lengthOf(6)
      expect(Point.getCall(0).args).to.eql([1, 0])
      expect(Point.getCall(1).args).to.eql([0.5, 1])
      expect(Point.getCall(2).args).to.eql([-0.5, 1])
      expect(Point.getCall(3).args).to.eql([-1, 0])
      expect(Point.getCall(4).args).to.eql([-0.5, -1])
      expect(Point.getCall(5).args).to.eql([0.5, -1])
    })
  })
})

describe('toPoint', function() {
  let Point, toPoint, isPointy, context

  beforeEach(function() {
    Point = sinon.stub().returns('point result')
    toPoint = methods.toPointFactory({ Point })
    isPointy = sinon.stub()
    context = {
      q: 1,
      r: 1,
      size: { xRadius: 1, yRadius: 1 },
      isPointy,
    }
  })

  it('returns the point', function() {
    const result = toPoint.call(context)
    expect(result).to.eql('point result')
  })

  describe('when the hex has a pointy orientation', function() {
    beforeEach(function() {
      isPointy.returns(true)
    })

    it('creates a new point', function() {
      toPoint.call(context)
      expect(Point.firstCall.args[0]).to.be.closeTo(2.598, 0.0005)
      expect(Point.firstCall.args[1]).to.equal(1.5)
    })
  })

  describe('when the hex has a flat orientation', function() {
    beforeEach(function() {
      isPointy.returns(false)
    })

    it('creates a new point', function() {
      toPoint.call(context)
      expect(Point.firstCall.args[0]).to.equal(1.5)
      expect(Point.firstCall.args[1]).to.be.closeTo(2.598, 0.0005)
    })
  })
})

describe('fromPoint', function() {
  let subtract, Point, Hex, isPointy, round, center, fromPoint, point

  beforeEach(function() {
    point = { x: 1, y: 1 }
    subtract = sinon.stub().returns(point)
    Point = sinon.stub().returns({ subtract })
    isPointy = sinon.stub()
    round = sinon.stub().returns('round result')
    center = sinon.stub().returns('center result')
    Hex = sinon.stub().returns({ round })
    fromPoint = methods.fromPointFactory({ Point, Hex }).bind({ size: { xRadius: 1, yRadius: 1 }, isPointy, center })
  })

  it('calls Point with the passed parameters', () => {
    fromPoint(1, 2)
    expect(Point).to.have.been.calledWith(1, 2)

    fromPoint({ x: 1, y: 2 })
    expect(Point).to.have.been.calledWith({ x: 1, y: 2 })

    fromPoint([1, 2])
    expect(Point).to.have.been.calledWith([1, 2])

    fromPoint(1)
    expect(Point).to.have.been.calledWith(1)
  })

  it(`subtracts the hex's center from the point`, function() {
    fromPoint(point)
    expect(center).to.have.been.called
    expect(subtract).to.have.been.calledWith('center result')
  })

  describe('when the hex has a pointy orientation', function() {
    it('creates a new hex', function() {
      isPointy.returns(true)
      fromPoint(point)

      expect(Hex.firstCall.args[0].q).to.be.closeTo(0.244, 0.0005)
      expect(Hex.firstCall.args[0].r).to.be.closeTo(0.6667, 0.0005)
    })
  })

  describe('when the hex has a flat orientation', function() {
    it('creates a new hex', function() {
      isPointy.returns(false)
      fromPoint(point)

      expect(Hex.firstCall.args[0].q).to.be.closeTo(0.6667, 0.0005)
      expect(Hex.firstCall.args[0].r).to.be.closeTo(0.244, 0.0005)
    })
  })

  it('rounds that hex', function() {
    fromPoint(point)
    expect(round).to.have.been.called
  })

  it('returns the hex', function() {
    const result = fromPoint(point)
    expect(result).to.equal('round result')
  })
})

describe('add', function() {
  let HexSpy, PointSpy, add

  before(function() {
    HexSpy = sinon.spy(Hex)
    PointSpy = sinon.spy(Point)
    add = methods.addFactory({ Hex: HexSpy, Point: PointSpy }).bind(Object.freeze({ x: 1, y: -3 }))
  })

  it('accepts a point', () => {
    expect(add([2, 1])).to.contain({ x: 3, y: -2 })
    expect(PointSpy).to.have.been.calledWith([2, 1])
  })

  it('returns a new hex where the coordinates are the sum of the current and passed point', function() {
    expect(add(Hex(2, 1))).to.contain({ x: 3, y: -2 })
    expect(HexSpy).to.have.been.calledWith(3, -2)
  })

  it('transfers any custom properties the current hex might have', function() {
    const result = Hex({ x: 0, y: 0, custom: 'add()' }).add(Hex())
    expect(result).to.contain({ custom: 'add()' })
  })
})

describe('subtract', function() {
  let HexSpy, PointSpy, subtract

  before(function() {
    HexSpy = sinon.spy(Hex)
    PointSpy = sinon.spy(Point)
    subtract = methods.subtractFactory({ Hex: HexSpy, Point: PointSpy }).bind(Object.freeze({ x: 1, y: -3 }))
  })

  it('accepts a point', () => {
    expect(subtract([2, 1])).to.contain({ x: -1, y: -4 })
    expect(PointSpy).to.have.been.calledWith([2, 1])
  })

  it('returns a new hex where the coordinates are the sum of the current and passed point', function() {
    expect(subtract(Hex(2, 1))).to.contain({ x: -1, y: -4 })
    expect(HexSpy).to.have.been.calledWith(-1, -4)
  })

  it('transfers any custom properties the current hex might have', function() {
    const result = Hex({ x: 0, y: 0, custom: 'subtract()' }).subtract(Hex())
    expect(result).to.contain({ custom: 'subtract()' })
  })
})

describe('equals', function() {
  it('accepts a point', () => {
    expect(Hex().equals([0, 0])).to.be.true
  })

  it('returns whether the coordinates of the current hex and the passed point are equal', function() {
    expect(Hex().equals(Hex())).to.be.true
    expect(Hex(5, -3).equals(Hex(-1, 2))).to.be.false
  })

  it('ignores any custom properties', function() {
    const hex1 = Hex(4, 4, { custom: 1 })
    const hex2 = Hex(4, 4, { custom: 2 })

    expect(hex1.equals(hex2)).to.be.true
  })

  describe('when passed anything but an array, point or hex', () => {
    it('returns false', () => {
      expect(Hex().equals()).to.be.false
      expect(Hex(null).equals(null)).to.be.false
      expect(Hex({}).equals({})).to.be.false
      expect(Hex('a').equals('a')).to.be.false

      expect(Hex(4, 5).equals([4, 5])).to.be.true
      expect(Hex(3, 2).equals(Point(3, 2))).to.be.true
    })
  })
})

describe('distance', function() {
  it('returns the highest absolute coordinate of the other hex coordinates subtracted from the current', function() {
    const distance = methods.distance.bind({ q: 1, r: 2, s: -3 })
    expect(distance({ q: 1, r: 1, s: 1 })).to.equal(4)
  })
})

describe('round', function() {
  let spiedHex, round

  before(function() {
    spiedHex = sinon.spy(Hex)
    round = methods.roundFactory({ Hex: spiedHex }).bind(Object.freeze({ q: 2.9, r: 2.2, s: -5.1, custom: 'round()' }))
  })

  it('rounds floating point coordinates to their nearest integer coordinates', function() {
    round()
    expect(spiedHex).to.have.been.calledWith({ q: 3, r: 2, s: -5, custom: 'round()' })
  })

  it('transfers any custom properties the current hex might have', function() {
    expect(round()).to.have.property('custom', 'round()')
  })
})

describe('lerp', function() {
  let spiedHex, lerp

  before(function() {
    spiedHex = sinon.spy(Hex)
    lerp = methods.lerpFactory({ Hex: spiedHex }).bind(Object.freeze({ q: 0, r: 0, s: 0, custom: 'lerp()' }))
  })

  it('returns an interpolation between the current and passed hex for a `t` between 0..1', function() {
    lerp({ q: 4, r: -5, s: 1 }, 0.5)
    expect(spiedHex).to.have.been.calledWith({ q: 2, r: -2.5, s: 0.5, custom: 'lerp()' })
  })

  it('transfers any custom properties the current hex might have', function() {
    expect(lerp(Hex(), 0)).to.have.property('custom', 'lerp()')
  })
})

describe('nudge', function() {
  it('returns the current hex with a tiny offset on each cube coordinate', function() {
    const hex = Hex({ q: 1, r: -3, s: 2 })
    const result = hex.nudge()

    expect(result.q).to.eql(1.000001)
    expect(result.r).to.eql(-2.999999)
    expect(result.s).to.eql(1.999998)
  })

  it('transfers any custom properties the current hex might have', function() {
    const result = Hex(0, 0, { custom: 'nudge()' }).nudge()
    expect(result).to.have.property('custom', 'nudge()')
  })
})

describe('toString', function() {
  it('returns a string containing the coordinates of the hex', function() {
    expect(Hex(1, 2).toString()).to.eql('1,2')
  })
})

describe('center', () => {
  it(`returns a hex's center point relative to its origin`, () => {
    let Hex = extendHex()
    let result = Hex().center()

    expect(result.x).to.be.closeTo(0.866, 0.0005)
    expect(result.y).to.equal(1)

    Hex = extendHex({ size: 10, origin: [5, 5] })
    result = Hex().center()
    expect(result.x).to.be.closeTo(3.6602, 0.005)
    expect(result.y).to.equal(5)
  })
})
