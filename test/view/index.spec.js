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
        const template = sinon.spy()
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
            const result = View({ grid, template, container, origin })

            expect(result).to.have.property('grid').that.eqls(grid)
            expect(result).to.have.property('template').that.equals(template)
            expect(result).to.have.property('container').that.eqls(container)
            expect(result).to.have.property('origin').that.eqls(origin)
            expect(result).to.have.property('hexes').that.is.an('array')
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
            const element = document.createElement('hex')
            const template = sinon.stub().returns(element)
            const container = document.createElement('div')
            sinon.spy(container, 'appendChild')
            const origin = 'origin'
            const view = View({ template, container, origin })
            const hexesToRender = [ 'a hex' ]

            const result = view.renderHexes(hexesToRender)

            expect(template).to.have.been.calledWith(hexesToRender[0])
            expect(container.appendChild).to.have.been.calledWith(document.createDocumentFragment())
            expect(container.firstChild).to.eql(element)

            expect(result.template).to.eql(template)
            expect(result.container).to.eql(container)
            expect(result.origin).to.eql(origin)
            expect(result.hexes).to.eql(hexesToRender)

            container.appendChild.restore()
        })
    })
})

