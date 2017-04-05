import { expect } from 'chai'
import sinon from 'sinon'
import jsdom from 'mocha-jsdom'

import HexFactory from '../../src/hex'
import Grid from '../../src/grid'
import DOMFactory from '../../src/views/dom'

describe('DOM View creation', () => {
    const Hex = sinon.stub()
    const Point = sinon.stub().callsFake(value => value)
    const isDom = sinon.stub().returns(true)
    const DOM = DOMFactory({ Hex, Point, isDom })

    it('calls isDom to check if the container is a valid DOM node', () => {
        const container = 'container'
        DOM({ container })
        expect(isDom).to.have.been.calledWith(container)
    })

    it('throws an error if the container is not a valid DOM node', () => {
        isDom.returns(false)
        expect(DOM).to.throw('Container is not a valid dom node: undefined.')
    })

    describe('with valid options', () => {
        const container = 'valid container'
        const origin = [2, 3]

        before(() => isDom.returns(true))

        it('wraps the passed origin in a Point', () => {
            DOM({ origin })
            expect(Point).to.have.been.calledWith(origin)
        })

        it('returns a DOM View instance', () => {
            const result = DOM({ container, origin })

            expect(result).to.have.property('container').that.eqls(container)
            expect(result).to.have.property('origin').that.eqls(origin)
            expect(result).to.have.property('render').that.is.a('function')
            expect(result).to.have.property('renderHexes').that.is.a('function')
        })
    })
})

describe('DOM View rendering', () => {
    const subtract = sinon.stub().returns('subtract result')
    const Hex = sinon.stub().returns('Hex result')
    Hex.subtract = subtract
    const Point = sinon.stub().callsFake(value => value)
    const isDom = sinon.stub().returns(true)
    const DOM = DOMFactory({ Hex, Point, isDom })

    describe('render', () => {
        it('renders a rectangle from the passed grid', () => {
            const container = {
                offsetWidth: 1,
                offsetHeight: 1
            }
            const invert = sinon.stub().returns('invert result')
            const origin = { invert }
            const dom = DOM()
            const colSize = sinon.stub().returns(1)
            const rowSize = sinon.stub().returns(1)
            const pointToHex = sinon.stub().returns('pointToHex result')
            const rectangle = sinon.stub().returns('rectangle result')
            const grid = { colSize, rowSize, pointToHex, rectangle }
            const renderHexes = sinon.stub().returns('renderHexes result')
            const result = dom.render.bind({ container, origin, renderHexes })(grid)

            expect(colSize).to.have.been.called
            expect(rowSize).to.have.been.called
            expect(Hex).to.have.been.calledWith(1)
            expect(invert).to.have.been.called
            expect(pointToHex).to.have.been.calledWith('invert result')
            expect(subtract).to.have.been.calledWith('pointToHex result', 'Hex result')
            expect(rectangle).to.have.been.calledWith(4, 4, 'subtract result')
            expect(renderHexes).to.have.been.calledWith('rectangle result')
            expect(result).to.equal('renderHexes result')
        })
    })

    describe('renderHexes', () => {
        jsdom()

        it('renders a rectangle from the passed grid', () => {
            const container = document.createElement('div')
            const add = sinon.stub().returns({ x: 1, y: 2 })
            const origin = { add }
            const dom = DOM()
            const view = sinon.stub().returns('<div></div>')
            const toPoint = sinon.stub().returns('toPoint result')
            const width = sinon.stub().returns(3)
            const height = sinon.stub().returns(4)
            const hexes = [{ view, toPoint, width, height }]
            const context = { container, origin }
            const result = dom.renderHexes.bind(context)(hexes)

            expect(view).to.have.been.called
            expect(toPoint).to.have.been.called
            expect(add).to.have.been.calledWith('toPoint result')
            expect(width).to.have.been.called
            expect(height).to.have.been.called
            expect(result).to.eql(context)

            const hexNode = container.firstChild

            expect(hexNode.nodeName).to.equal('DIV')
            expect(hexNode.style).to.have.property('position', 'absolute')
            expect(hexNode.style).to.have.property('left', '1px')
            expect(hexNode.style).to.have.property('top', '2px')
            expect(hexNode.style).to.have.property('width', '3px')
            expect(hexNode.style).to.have.property('height', '4px')
        })
    })
})
