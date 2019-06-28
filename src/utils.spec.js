/* eslint-env mocha */

import { expect } from 'chai'

import { compassToNumberDirection, signedModulo } from './utils'

describe('signedModulo', () => {
  describe('when called with a negative dividend', () => {
    it('returns the modulo mirrored from the divider(?)', () => {
      expect(signedModulo(1, 6)).to.equal(1)
      expect(signedModulo(-1, 6)).to.equal(5)
    })
  })
})

describe('compassToNumberDirection', () => {
  let orientation

  describe('when called with an invalid compass direction', () => {
    it('throws', () => {
      expect(() => compassToNumberDirection('invalid')).to.throw(
        'Invalid compass direction: invalid. Choose from E, SE, S, SW, W, NW, N or NE.',
      )
    })
  })

  describe('when called with an ambiguous compass direction', () => {
    it('throws', () => {
      expect(() => compassToNumberDirection('N', 'pointy')).to.throw(
        `Direction N is ambiguous for pointy hexes. Did you mean NE or NW?`,
      )
      expect(() => compassToNumberDirection('S', 'pointy')).to.throw(
        `Direction S is ambiguous for pointy hexes. Did you mean SE or SW?`,
      )
      expect(() => compassToNumberDirection('E', 'flat')).to.throw(
        `Direction E is ambiguous for flat hexes. Did you mean NE or SE?`,
      )
      expect(() => compassToNumberDirection('W', 'flat')).to.throw(
        `Direction W is ambiguous for flat hexes. Did you mean NW or SW?`,
      )
    })
  })

  describe('when called with a pointy orientation', () => {
    before(() => {
      orientation = 'pointy'
    })

    it('converts a compass direction to a number direction', () => {
      expect(compassToNumberDirection('E', orientation)).to.equal(0)
      expect(compassToNumberDirection('SE', orientation)).to.equal(1)
      expect(compassToNumberDirection('SW', orientation)).to.equal(2)
      expect(compassToNumberDirection('W', orientation)).to.equal(3)
      expect(compassToNumberDirection('NW', orientation)).to.equal(4)
      expect(compassToNumberDirection('NE', orientation)).to.equal(5)
    })
  })

  describe('when called with a flat orientation', () => {
    before(() => {
      orientation = 'flat'
    })

    it('converts a compass direction to a number direction', () => {
      expect(compassToNumberDirection('SE', orientation)).to.equal(0)
      expect(compassToNumberDirection('S', orientation)).to.equal(1)
      expect(compassToNumberDirection('SW', orientation)).to.equal(2)
      expect(compassToNumberDirection('NW', orientation)).to.equal(3)
      expect(compassToNumberDirection('N', orientation)).to.equal(4)
      expect(compassToNumberDirection('NE', orientation)).to.equal(5)
    })
  })
})
