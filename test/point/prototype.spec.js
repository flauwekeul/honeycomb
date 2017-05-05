import { expect } from 'chai'
import Point from '../../src/point'

describe('Point methods', function() {
    describe('add', function() {
        it('adds the coordinates of the given point to itself', function() {
            const result = Point(1, -3).add(Point(2, 4))
            expect(result).to.contain({ x: 3, y: 1 })
        })
    })

    describe('subtract', function() {
        it('subtracts the coordinates of given point from itself', function() {
            const result = Point(1, -3).subtract(Point(2, 4))
            expect(result).to.contain({ x: -1, y: -7 })
        })
    })

    describe('multiply', function() {
        it('multiplies the coordinates of given point by itself', function() {
            const result = Point(1, -3).multiply(Point(2, 4))
            expect(result).to.contain({ x: 2, y: -12 })
        })
    })

    describe('divide', function() {
        it('divides the coordinates of given point by itself', function() {
            const result = Point(1, -3).divide(Point(2, 4))
            expect(result).to.contain({ x: 0.5, y: -0.75 })
        })
    })
})
