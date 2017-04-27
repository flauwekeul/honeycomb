import 'jsdom-global/register'
import { expect } from 'chai'
import sinon from 'sinon'

import ViewFactory from '../../src/view'

describe('View creation', function() {
    const Point = sinon.stub().callsFake(value => value)
    const isDom = sinon.stub().returns(true)
    const View = ViewFactory({ Point, isDom })

    it('calls isDom to check if the container is a valid DOM node', function() {
        const container = 'container'
        View({ container })
        expect(isDom).to.have.been.calledWith(container)
    })

    it('throws an error if the container is not a valid DOM node', function() {
        isDom.returns(false)
        expect(View).to.throw('Container is not a valid dom node: undefined.')
    })

    describe('with valid options', function() {
        const grid = sinon.spy()
        const render = sinon.spy()
        const container = 'valid container'
        const origin = [2, 3]

        before(function() {
            isDom.returns(true)
        })

        it('wraps the passed origin in a Point', function() {
            View({ origin })
            expect(Point).to.have.been.calledWith(origin)
        })

        it('returns a View instance', function() {
            const result = View({ grid, render, container, origin })

            expect(result).to.have.property('grid').that.eqls(grid)
            expect(result).to.have.property('render').that.equals(render)
            expect(result).to.have.property('container').that.eqls(container)
            expect(result).to.have.property('origin').that.eqls(origin)
            expect(result).to.have.property('elements').that.is.an('array')
        })
    })
})

describe('View methods', function() {
    const subtract = sinon.stub().returns('subtract result')
    const Point = sinon.stub().callsFake(value => value)
    const isDom = sinon.stub().returns(true)
    const View = ViewFactory({ Point, isDom })

    describe('renderGrid', function() {
        it('renders the grid', function() {
            const Hex = sinon.stub().returns('Hex result')
            Hex.subtract = subtract
            const getBoundingClientRect = sinon.stub().returns({
                width: 1,
                height: 1
            })
            const container = { getBoundingClientRect }
            const invert = sinon.stub().returns('invert result')
            const origin = { invert }
            const colSize = sinon.stub().returns(1)
            const rowSize = sinon.stub().returns(1)
            const pointToHex = sinon.stub().returns('pointToHex result')
            const rectangle = sinon.stub().returns('rectangle result')
            const grid = { Hex, colSize, rowSize, pointToHex, rectangle }
            const renderHexes = sinon.stub().returns('renderHexes result')
            const view = View()
            const result = view.renderGrid.bind({ grid, container, origin, renderHexes })()

            expect(getBoundingClientRect).to.have.been.called
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

    describe('renderHexes', function() {
        it('renders a rectangle from the passed grid', function() {
            const container = document.createElement('div')
            sinon.spy(container, 'appendChild')
            const origin = 'origin'
            const appendTo = sinon.stub().returns('appendTo result')
            const position = sinon.stub().returns({ appendTo })
            const render = sinon.stub().returns({ position })
            const view = View()
            const hexes = [ 'a hex' ]
            const elements = []
            const context = { render, origin, elements, container }
            const result = view.renderHexes.bind(context)(hexes)

            expect(render).to.have.been.calledWith(hexes[0])
            expect(position).to.have.been.calledWith(origin)
            expect(appendTo).to.have.been.calledWith(document.createDocumentFragment())
            expect(elements).to.contain('appendTo result')
            expect(result).to.eql(context)
            expect(container.appendChild).to.have.been.calledWith(document.createDocumentFragment())

            container.appendChild.restore()
        })
    })
})

