import { expect } from 'chai'
import jsdom from 'mocha-jsdom'
import sinon from 'sinon'

import Hex from '../../../src/hex'
import Grid from '../../../src/grid'
import DOM from '../../../src/views/dom'

let grid, container, dom

describe('Views.DOM prototype', () => {
    jsdom()

    beforeEach(() => {
        grid = Grid({
            hex: {
                orientation: 'pointy',
                size: 10,
                origin: [0, 0]
            }
        })
        container = document.createElement('div')
        dom = DOM({
            container: container,
            hex: { element: '<div></div>' }
        })
        sinon.spy(dom, 'renderHexes')
        sinon.spy(grid, 'rectangle')
    })

    after(() => {
        dom.renderHexes.restore()
        grid.rectangle.restore()
    })

    describe('renderHexes', () => {
        it('renders the passed hexes in the container', () => {
            const hexes = [ Hex(0, 0), Hex(1, 0) ]

            dom.renderHexes(hexes)
            expect(container.childNodes).to.have.length(2)
        })

        it('sets each hex\'s style properties position, width and height the same', () => {
            const hexes = [ Hex(0, 0), Hex(1, 0) ]

            dom.renderHexes(hexes)

            const renderedHex1 = container.childNodes[0]
            const renderedHex2 = container.childNodes[1]
            const expected = {
                position: 'absolute',
                width: `${Hex.prototype.width()}px`,
                height: `${Hex.prototype.height()}px`
            }

            expect(renderedHex1.style).to.contain(expected)
            expect(renderedHex2.style).to.contain(expected)
        })

        it('sets each hex\'s style properties top and left', () => {
            const hexes = [ Hex(1, 0), Hex(0, 1) ]

            dom.renderHexes(hexes)

            const renderedHex1Style = container.childNodes[0].style
            const renderedHex2Style = container.childNodes[1].style

            expect(renderedHex1Style).to.have.property('top').that.equals('0px')
            expect(renderedHex1Style).to.have.property('left').that.equals(`${Hex.prototype.width()}px`)
            expect(renderedHex2Style).to.have.property('top').that.equals(`${grid.rowSize()}px`)
            expect(renderedHex2Style).to.have.property('left').that.equals(`${Hex.prototype.width() / 2}px`)
        })
    })

    describe('render', () => {
        it('renders a rectangle from the passed grid', () => {
            // mock container offsetWidth and offsetHeight because jsdom can't calculate it
            // https://github.com/tmpvar/jsdom/issues/135
            container.offsetWidth = 30
            container.offsetHeight = 30

            dom.render(grid)

            expect(grid.rectangle).to.have.been.calledWith(2, 2)
            expect(dom.renderHexes).to.have.been.calledWith(sinon.match(() => grid.rectangle(2, 2)))
        })
    })
})
