/* eslint-env mocha */

import { expect } from 'chai'

import { ensureXY } from '../utils'
import PointFactory from './'

const Point = PointFactory({ ensureXY })

describe('Point methods', function() {
  describe('add', function() {
    it('accepts the same parameters as Point()', () => {
      expect(Point().add(1, 2)).to.be.an('object')
      expect(Point().add({ x: 1, y: 2 })).to.be.an('object')
      expect(Point().add([1, 2])).to.be.an('object')
      expect(Point().add(1)).to.be.an('object')
    })

    it('adds the coordinates of the given point to itself', function() {
      const result = Point(1, -3).add(2, 4)
      expect(result).to.contain({ x: 3, y: 1 })
    })
  })

  describe('subtract', function() {
    it('accepts the same parameters as Point()', () => {
      expect(Point().subtract(1, 2)).to.be.an('object')
      expect(Point().subtract({ x: 1, y: 2 })).to.be.an('object')
      expect(Point().subtract([1, 2])).to.be.an('object')
      expect(Point().subtract(1)).to.be.an('object')
    })

    it('subtracts the coordinates of given point from itself', function() {
      const result = Point(1, -3).subtract(2, 4)
      expect(result).to.contain({ x: -1, y: -7 })
    })
  })

  describe('multiply', function() {
    it('accepts the same parameters as Point()', () => {
      expect(Point().multiply(1, 2)).to.be.an('object')
      expect(Point().multiply({ x: 1, y: 2 })).to.be.an('object')
      expect(Point().multiply([1, 2])).to.be.an('object')
      expect(Point().multiply(1)).to.be.an('object')
    })

    it('multiplies the coordinates of given point by itself', function() {
      const result = Point(1, -3).multiply(2, 4)
      expect(result).to.contain({ x: 2, y: -12 })
    })
  })

  describe('divide', function() {
    it('accepts the same parameters as Point()', () => {
      expect(Point().divide(1, 2)).to.be.an('object')
      expect(Point().divide({ x: 1, y: 2 })).to.be.an('object')
      expect(Point().divide([1, 2])).to.be.an('object')
      expect(Point().divide(1)).to.be.an('object')
    })

    it('divides the coordinates of given point by itself', function() {
      const result = Point(1, -3).divide(2, 4)
      expect(result).to.contain({ x: 0.5, y: -0.75 })
    })
  })
})
