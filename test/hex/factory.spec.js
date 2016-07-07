import { expect } from 'chai'
import sinon from 'sinon'

import { ORIENTATIONS } from '../../src/hex/constants'
import Hex from '../../src/hex'

describe('Hex factory', () => {
    before(() => sinon.spy(console, 'warn'))
    after(() => console.warn.restore())

    describe('creation', () => {
        describe('with 3 numbers', () => {
            it('assumes the numbers are cube coordinates', () => {
                expect(Hex(3, -5, 2)).to.contain({ x: 3, y: -5, z: 2 })
            })

            describe('when x + y + z !== 0', () => {
                it('overrides z', () => {
                    expect(Hex(3, -5, 8)).to.contain({ x: 3, y: -5, z: 2 })
                })
            })
        })

        describe('with 2 numbers', () => {
            it('assumes the numbers are axial coordinates and converts them to cube', () => {
                expect(Hex(3, 2)).to.contain({ x: 3, y: 2, z: -5 })
            })
        })

        describe('with 1 number', () => {
            it('assumes the number is an axial x coordinate, sets y to the same value and converts them to cube', () => {
                expect(Hex(3)).to.contain({ x: 3, y: 3, z: -6 })
            })
        })

        describe('with an object containing x, y and z', () => {
            it('sets the coordinates', () => {
                expect(Hex({ x: 3, y: 2, z: -5 })).to.contain({ x: 3, y: 2, z: -5 })
            })

            describe('when x + y + z !== 0', () => {
                it('overrides z', () => {
                    expect(Hex(3, 2, -10)).to.contain({ x: 3, y: 2, z: -5 })
                })
            })
        })

        describe('with an object containing 2 coordinates (from x, y and z)', () => {
            it('calculates the third coordinate and sets all 3', () => {
                expect(Hex({ x: 3, y: 0 })).to.contain({ x: 3, y: 0, z: -3 })
                expect(Hex({ x: 3, z: 0 })).to.contain({ x: 3, y: -3, z: 0 })
                expect(Hex({ y: 3, z: 0 })).to.contain({ x: -3, y: 3, z: 0 })
            })
        })

        describe('with an object containing 1 coordinate (from x, y and z)', () => {
            it('show a warning', () => {
                Hex({ x: 3 })
                expect(console.warn).to.have.been
                    .calledWith('Invalid or not enough coordinates: { x: 3, y: undefined, z: undefined }.')
                Hex({ y: 3 })
                expect(console.warn).to.have.been
                    .calledWith('Invalid or not enough coordinates: { x: undefined, y: 3, z: undefined }.')
                Hex({ z: 3 })
                expect(console.warn).to.have.been
                    .calledWith('Invalid or not enough coordinates: { x: undefined, y: undefined, z: 3 }.')
            })
        })

        describe('without parameters', () => {
            it('sets all cube coordinates to 0', () => {
                expect(Hex()).to.contain({ x: 0, y: 0, z: 0 })
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

    describe('origin', () => {
        describe('when called without arguments', () => {
            it('returns the hex\'s origin', () => {
                Hex.prototype.origin([-3, -1])
                expect(Hex().origin()).to.contain({ x: -3, y: -1 })
            })
        })

        describe('when called with a origin', () => {
            it('shows a warning', () => {
                Hex().origin([2, 0])
                expect(console.warn).to.have.been
                    .calledWith('Can\'t set origin of single hex. Use Hex.prototype.origin([2, 0]) to set origin for all hexes.')
            })

            it('doesn\'t change the origin', () => {
                Hex.prototype.origin([-3, -1])
                Hex().origin([9, 5])
                expect(Hex().origin()).to.contain({ x: -3, y: -1 })
            })
        })
    })
})
