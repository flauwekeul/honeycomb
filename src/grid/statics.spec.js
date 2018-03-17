/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'

import { ensureXY, compassToNumberDirection, signedModulo } from '../utils'
import extendHexFactory from '../hex'
import Grid from './class'
import * as statics from './statics'
import PointFactory from '../point'

const Point = PointFactory({ ensureXY })
const extendHex = extendHexFactory({ ensureXY, Point })
const Hex = extendHex()

describe('pointToHex', function() {
    it('creates a Hex and passes all parameters to its fromPoint() method and returns that result', function() {
        const fromPoint = sinon.stub().returns('fromPoint result')
        const Hex = sinon.stub().returns({ fromPoint })
        const pointToHex = statics.pointToHexFactory({ Hex })
        const result = pointToHex('some x', 'some y')

        expect(Hex).to.have.been.called
        expect(fromPoint).to.have.been.calledWith('some x', 'some y')
        expect(result).to.equal('fromPoint result')
    })
})

describe('parallelogram', function() {
    let parallelogram

    before(function() {
        parallelogram = statics.parallelogramFactory({ Grid, Hex })
    })

    it('returns a grid instance with a length of (width ⨉ height) hexes', function() {
        const gridInstance = sinon.createStubInstance(Grid)
        const GridSpy = sinon.spy(() => gridInstance)
        const parallelogram = statics.parallelogramFactory({ Grid: GridSpy, Hex })
        const result = parallelogram({ width: 2, height: 3 })

        expect(result).to.equal(gridInstance)
        expect(gridInstance.push.callCount).to.equal(6)
    })

    describe('when called without start hex or direction', function() {
        it('returns the hexes in a parallelogram shape, starting at Hex(0)', function() {
            expect(parallelogram({ width: 2, height: 2 })).to.contain.hexes([
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ])
        })
    })

    describe('when called with start hex', function() {
        it('returns the hexes in a parallelogram shape, starting at the given start hex', function() {
            expect(parallelogram({
                width: 2,
                height: 2,
                start: Hex(5, 4)
            })).to.contain.hexes([
                { x: 5, y: 4 },
                { x: 6, y: 4 },
                { x: 5, y: 5 },
                { x: 6, y: 5 }
            ])
        })
    })

    describe('when called with direction 1', function() {
        it('returns the hexes in a parallelogram shape, in a southeastern direction', function() {
            expect(parallelogram({
                width: 2,
                height: 2,
                direction: 1
            })).to.contain.hexes([
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ])
        })
    })

    describe('when called with direction 3', function() {
        it('returns the hexes in a parallelogram shape, in a southwestern direction', function() {
            expect(parallelogram({
                width: 2,
                height: 2,
                direction: 3
            })).to.contain.hexes([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: -2, y: 1 },
                { x: -1, y: 1 }
            ])
        })
    })

    describe('when called with direction 5', function() {
        it('returns the hexes in a parallelogram shape, in a northern direction', function() {
            expect(parallelogram({
                width: 2,
                height: 2,
                direction: 5
            })).to.contain.hexes([
                { x: 0, y: -2 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 }
            ])
        })
    })

    describe('when called with an onCreate callback', function() {
        it('calls the callback for each created hex passing the hex and the grid', function() {
            const callback = sinon.spy()
            const result = parallelogram({
                width: 2,
                height: 2,
                onCreate: callback
            })
            expect(callback.callCount).to.eql(4)
            expect(callback).to.always.have.been.calledWithExactly(
                sinon.match.has('__isHoneycombHex', true),
                sinon.match.same(result)
            )
        })
    })
})

describe('triangle', function() {
    let triangle

    before(function() {
        triangle = statics.triangleFactory({ Grid, Hex })
    })

    // https://en.wikipedia.org/wiki/Triangular_number
    it('returns a grid instance with a length of the triangular number of the size', function() {
        const gridInstance = sinon.createStubInstance(Grid)
        const GridSpy = sinon.spy(() => gridInstance)
        const triangle = statics.triangleFactory({ Grid: GridSpy, Hex })
        const result = triangle({ size: 4 })

        expect(result).to.equal(gridInstance)
        expect(gridInstance.push.callCount).to.equal(4 + 3 + 2 + 1)
    })

    describe('when called without start hex or direction', function() {
        it('returns the hexes in a triangle shape, starting at Hex(0)', function() {
            expect(triangle({ size: 2 })).to.contain.hexes([
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 }
            ])
        })
    })

    describe('when called with start hex', function() {
        it('returns the hexes in a triangle shape, starting at the given start hex', function() {
            expect(triangle({
                size: 2,
                start: Hex(3, 6)
            })).to.contain.hexes([
                { x: 3, y: 6 },
                { x: 4, y: 6 },
                { x: 3, y: 7 }
            ])
        })
    })

    describe('when called with direction 1', function() {
        it('returns the hexes in a triangle shape, pointing down', function() {
            expect(triangle({
                size: 2,
                direction: 1
            })).to.contain.hexes([
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 }
            ])
        })
    })

    describe('when called with direction 5', function() {
        it('returns the hexes in a triangle shape, pointing up', function() {
            expect(triangle({
                size: 2,
                direction: 5
            })).to.contain.hexes([
                { x: 1, y: 1 },
                { x: 1, y: 2 },
                { x: 2, y: 2 }
            ])
        })
    })

    describe('when called with an onCreate callback', function() {
        it('calls the callback for each created hex passing the hex and the grid', function() {
            const callback = sinon.spy()
            const result = triangle({
                size: 2,
                onCreate: callback
            })
            expect(callback.callCount).to.eql(3)
            expect(callback).to.always.have.been.calledWithExactly(
                sinon.match.has('__isHoneycombHex', true),
                sinon.match.same(result)
            )
        })
    })
})

describe('hexagon', function() {
    let hexagon

    before(function() {
        hexagon = statics.hexagonFactory({ Grid, Hex })
    })

    it('returns a grid instance with a hard to determine amount of hexes 😬', function() {
        const gridInstance = sinon.createStubInstance(Grid)
        const GridSpy = sinon.spy(() => gridInstance)
        const hexagon = statics.hexagonFactory({ Grid: GridSpy, Hex })
        const result = hexagon({ radius: 3 })

        expect(result).to.equal(gridInstance)
        expect(gridInstance.push.callCount).to.equal(37)
    })

    describe('when called without center hex', function() {
        it('returns the hexes in a hexagon shape, with its center at Hex(0)', function() {
            expect(hexagon({ radius: 1 })).to.contain.hexes([
                { x: -1, y: 1 },
                { x: 0, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: 1 },
                { x: 0, y: 1 }
            ])
        })
    })

    describe('when called with center hex', function() {
        it('returns the hexes in a hexagon shape, with its center at the given center hex', function() {
            expect(hexagon({
                radius: 1,
                center: Hex(3, 1)
            })).to.contain.hexes([
                { x: 3, y: 0 },
                { x: 4, y: 0 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 4, y: 1 },
                { x: 3, y: 2 },
                { x: 4, y: 2 }
            ])
        })
    })

    describe('when called with an onCreate callback', function() {
        it('calls the callback for each created hex passing the hex and the grid', function() {
            const callback = sinon.spy()
            const result = hexagon({
                radius: 1,
                onCreate: callback
            })
            expect(callback.callCount).to.eql(7)
            expect(callback).to.always.have.been.calledWithExactly(
                sinon.match.has('__isHoneycombHex', true),
                sinon.match.same(result)
            )
        })
    })
})

describe('rectangle', function() {
    let compassToNumberDirectionSpy, signedModuloSpy, Hex, rectangle

    before(function() {
        compassToNumberDirectionSpy = sinon.spy(compassToNumberDirection)
        signedModuloSpy = sinon.spy(signedModulo)
        Hex = extendHex()
        rectangle = statics.rectangleFactory({
            Grid,
            Hex,
            compassToNumberDirection: compassToNumberDirectionSpy,
            signedModulo: signedModuloSpy
        })
    })

    it('returns a grid instance with a length of (width ⨉ height) hexes', function() {
        const gridInstance = sinon.createStubInstance(Grid)
        const GridSpy = sinon.spy(() => gridInstance)
        const rectangle = statics.rectangleFactory({ Grid: GridSpy, Hex })
        const result = rectangle({ width: 4, height: 5 })

        expect(result).to.equal(gridInstance)
        expect(gridInstance.push.callCount).to.equal(20)
    })

    describe('when called with a compass direction', () => {
        it('calls compassToNumberDirection', () => {
            rectangle({ direction: 'E' })
            expect(compassToNumberDirectionSpy).to.have.been.calledWith('E', 'pointy')
        })
    })

    describe('when called with directions outside 0..5', () => {
        it(`passes them to signedModulo`, () => {
            rectangle({ direction: -1 })
            expect(signedModuloSpy).to.have.been.calledWith(-1, 6)

            signedModuloSpy.reset()

            rectangle({ direction: 3 })
            expect(signedModuloSpy).not.to.have.been.called
        })
    })

    describe('when hexes have a pointy orientation', function() {
        before(function() {
            Hex = extendHex({ orientation: 'pointy' })
            rectangle = statics.rectangleFactory({ Grid, Hex })
        })

        describe('when called without start hex or direction', function() {
            it('returns the hexes in a rectangle shape in direction 0, starting at Hex(0)', function() {
                expect(rectangle({ width: 2, height: 3 })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 2 }
                ])
            })
        })

        describe('when called with start hex', function() {
            it('returns the hexes in a rectangle shape, starting at the given start hex', function() {
                expect(rectangle({
                    width: 2,
                    height: 3,
                    start: Hex(-4, -2)
                })).to.contain.hexes([
                    { x: -4, y: -2 },
                    { x: -3, y: -2 },
                    { x: -4, y: -1 },
                    { x: -3, y: -1 },
                    { x: -4, y: 0 },
                    { x: -3, y: 0 }
                ])
            })
        })

        describe('when called with direction 0', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 0
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 }
                ])
            })
        })

        describe('when called with direction 1', function() {
            it('returns the hexes in a rectangle shape, in a southeastern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 1
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 }
                ])
            })
        })

        describe('when called with direction 2', function() {
            it('returns the hexes in a rectangle shape, in a southwestern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 2
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: -1, y: 1 },
                    { x: -1, y: 0 },
                    { x: -2, y: 1 }
                ])
            })
        })

        describe('when called with direction 3', function() {
            it('returns the hexes in a rectangle shape, in a western direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 3
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: -1, y: 0 },
                    { x: -1, y: 1 },
                    { x: -2, y: 1 }
                ])
            })
        })

        describe('when called with direction 4', function() {
            it('returns the hexes in a rectangle shape, in a northwestern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 4
                })).to.contain.hexes([
                    { x: 0, y: -2 },
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 }
                ])
            })
        })

        describe('when called with direction 5', function() {
            it('returns the hexes in a rectangle shape, in a northeastern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 5
                })).to.contain.hexes([
                    { x: 0, y: -2 },
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 }
                ])
            })
        })
    })

    describe('when hexes have a flat orientation', function() {
        before(function() {
            Hex = extendHex({ orientation: 'flat' })
            rectangle = statics.rectangleFactory({ Grid, Hex })
        })

        describe('when called without start hex or direction', function() {
            it('returns the hexes in a rectangle shape in direction 1, starting at Hex(0)', function() {
                expect(rectangle({ width: 2, height: 3 })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 2 }
                ])
            })
        })

        describe('when called with start hex', function() {
            it('returns the hexes in a rectangle shape, starting at the given start hex', function() {
                expect(rectangle({
                    width: 2,
                    height: 3,
                    start: Hex(-4, -2)
                })).to.contain.hexes([
                    { x: -4, y: -2 },
                    { x: -3, y: -2 },
                    { x: -4, y: -1 },
                    { x: -3, y: -1 },
                    { x: -4, y: 0 },
                    { x: -3, y: 0 }
                ])
            })
        })

        describe('when called with direction 0', function() {
            it('returns the hexes in a rectangle shape, in a southeastern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 0
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 }
                ])
            })
        })

        describe('when called with direction 1', function() {
            it('returns the hexes in a rectangle shape, in a southern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 1
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 }
                ])
            })
        })

        describe('when called with direction 2', function() {
            it('returns the hexes in a rectangle shape, in a southwestern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 2
                })).to.contain.hexes([
                    { x: -1, y: -1 },
                    { x: -2, y: 0 },
                    { x: 0, y: 0 },
                    { x: -1, y: 0 }
                ])
            })
        })

        describe('when called with direction 3', function() {
            it('returns the hexes in a rectangle shape, in a northwestern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 3
                })).to.contain.hexes([
                    { x: -1, y: -1 },
                    { x: -2, y: 0 },
                    { x: -1, y: 0 },
                    { x: 0, y: 0 }
                ])
            })
        })

        describe('when called with direction 4', function() {
            it('returns the hexes in a rectangle shape, in a northern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 4
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 0, y: -1 },
                    { x: 1, y: -1 },
                    { x: 1, y: -2 }
                ])
            })
        })

        describe('when called with direction 5', function() {
            it('returns the hexes in a rectangle shape, in a northeastern direction', function() {
                expect(rectangle({
                    width: 2,
                    height: 2,
                    direction: 5
                })).to.contain.hexes([
                    { x: 0, y: 0 },
                    { x: 1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 1, y: -2 }
                ])
            })
        })
    })

    describe('when called with an onCreate callback', function() {
        it('calls the callback for each created hex passing the hex and the grid', function() {
            const callback = sinon.spy()
            const result = rectangle({
                width: 2,
                height: 2,
                onCreate: callback
            })
            expect(callback.callCount).to.eql(4)
            expect(callback).to.always.have.been.calledWithExactly(
                sinon.match.has('__isHoneycombHex', true),
                sinon.match.same(result)
            )
        })
    })
})
