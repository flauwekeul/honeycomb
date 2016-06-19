import { expect } from 'chai'
import sinon from 'sinon'

import { ORIENTATIONS } from '../../src/hex/constants'
import Hex from '../../src/hex'

describe('Hex factory', () => {
    describe('creation', () => {
        describe('with 3 numbers', () => {
            it('assumes the numbers are cube coordinates', () => {
                expect(Hex(3, 2, -5)).to.contain({
                    q: 3,
                    r: 2,
                    s: -5
                })
            })
        })

        describe('with 2 numbers', () => {
            it('assumes the numbers are axial coordinates and converts them to cube', () => {
                expect(Hex(3, 2)).to.contain({
                    q: 3,
                    r: -5,
                    s: 2
                })
            })
        })

        describe('with 1 number', () => {
            it('assumes the number is an axial x coordinate, sets y to the same value and converts them to cube', () => {
                expect(Hex(3)).to.contain({
                    q: 3,
                    r: -6,
                    s: 3
                })
            })
        })

        describe('with an object containing 3 entries, with keys: x, y or z', () => {
            it('sets the coordinates', () => {
                expect(Hex({ x: 3, y: 2, z: -5 })).to.contain({
                    q: 3,
                    r: -5,
                    s: 2
                })
            })
        })

        describe('with an object containing x and y', () => {
            it('calculates the third coordinate and sets all 3', () => {
                expect(Hex({ x: 3, y: 2 })).to.contain({
                    q: 3,
                    r: -5,
                    s: 2
                })
            })
        })

        describe('with an object containing only x', () => {
            it('sets y to the same value as x and calculates the third coordinate', () => {
                expect(Hex({ x: 3 })).to.contain({
                    q: 3,
                    r: -6,
                    s: 3
                })
            })
        })

        describe('without parameters', () => {
            it('sets all cube coordinates to 0', () => {
                expect(Hex()).to.contain({
                    q: 0,
                    r: 0,
                    s: 0
                })
            })
        })
    })

    describe('orientation', () => {
        describe('when called without arguments', () => {
            it('returns the hex\'s orientation', () => {
                Hex.prototype.orientation('pointy')
                expect(Hex().orientation()).to.equal(ORIENTATIONS.POINTY)
            })
        })

        describe('when called with an orientation', () => {
            beforeEach(() => sinon.spy(console, 'warn'))
            afterEach(() => console.warn.restore())

            it('shows a warning', () => {
                Hex().orientation('flat')
                expect(console.warn).to.have.been
                    .calledWith('Can\'t set orientation of single hex. Use Hex.prototype.orientation(\'flat\') to set orientation for all hexes.')
            })

            it('doesn\'t change the orientation', () => {
                Hex.prototype.orientation('pointy')
                Hex().orientation('flat')
                expect(Hex().orientation()).to.equal(ORIENTATIONS.POINTY)
            })
        })
    })

    describe('size', () => {
        describe('when called without arguments', () => {
            it('returns the hex\'s size', () => {
                Hex.prototype.size(10)
                expect(Hex().size()).to.equal(10)
            })
        })

        describe('when called with a size', () => {
            beforeEach(() => sinon.spy(console, 'warn'))
            afterEach(() => console.warn.restore())

            it('shows a warning', () => {
                Hex().size(20)
                expect(console.warn).to.have.been
                    .calledWith('Can\'t set size of single hex. Use Hex.prototype.size(20) to set size for all hexes.')
            })

            it('doesn\'t change the size', () => {
                Hex.prototype.size(10)
                Hex().size(20)
                expect(Hex().size()).to.equal(10)
            })
        })
    })
})
