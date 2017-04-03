import { expect } from 'chai'
import Point from '../../src/point'

describe('Point creation', () => {
    describe('with 2 numbers', () => {
        it('sets the coordinates', () => {
            expect(Point(3, 2)).to.contain({ x: 3, y: 2 })
            expect(Point(-3, -2)).to.contain({ x: -3, y: -2 })
            expect(Point(3.375, 2.950)).to.contain({ x: 3.375, y: 2.950 })
        })
    })

    describe('with 1 number', () => {
        it('assumes the number is the x coordinate and sets y to the same value', () => {
            expect(Point(3)).to.contain({ x: 3, y: 3 })
        })
    })

    describe('with an object containing x and y', () => {
        it('sets the coordinates', () => {
            expect(Point({ x: 3, y: 2 })).to.contain({ x: 3, y: 2 })
        })
    })

    describe('with an array containing 2 items', () => {
        it('sets the coordinates', () => {
            expect(Point([ 3, 2 ])).to.contain({ x: 3, y: 2 })
        })
    })

    describe('without parameters', () => {
        it('sets all coordinates to 0', () => {
            expect(Point()).to.contain({ x: 0, y: 0 })
        })
    })
})
