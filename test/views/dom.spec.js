import { expect } from 'chai'
import sinon from 'sinon'
import jsdom from 'mocha-jsdom'

import Hex from '../../src/hex'
import Grid from '../../src/grid'
import DOM from '../../src/views/dom'

let grid, container, dom

describe('DOM View creation', () => {
    jsdom()
    before(() => sinon.spy(Hex, 'element'))
    after(() => Hex.element.restore())

    describe('with valid options', () => {
        const hexElement = '<div></div>'

        it('returns a DOM view with the passed options', () => {
            const container = document.createElement('div')
            const view = DOM({
                container: container,
                origin: [6, 3],
                hex: { element: hexElement }
            })
            expect(view).to.have.property('container').that.eqls(container)
            expect(view).to.have.property('origin').that.contains({ x: 6, y: 3 })
            expect(view).to.have.property('hex').that.eqls({ element: hexElement })
        })

        it('sets Hex.element', () => {
            expect(Hex.element).to.have.been.calledWith(hexElement)
        })
    })

    describe('with invalid options', () => {
        describe('invalid container', () => {
            before(() => sinon.spy(console, 'warn'))
            after(() => console.warn.restore())

            it('shows a warning', () => {
                DOM({})
                expect(console.warn).to.have.been.calledWith('Container is not a valid dom node: undefined.')
                DOM({ container: '<div></div>' })
                expect(console.warn).to.have.been.calledWith('Container is not a valid dom node: <div></div>.')
            })
        })
    })
})

describe('DOM View rendering', () => {
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

    afterEach(() => {
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
                width: `${Hex.width()}px`,
                height: `${Hex.height()}px`
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
            expect(renderedHex1Style).to.have.property('left').that.equals(`${Hex.width()}px`)
            expect(renderedHex2Style).to.have.property('top').that.equals(`${grid.rowSize()}px`)
            expect(renderedHex2Style).to.have.property('left').that.equals(`${Hex.width() / 2}px`)
        })
    })

    describe('render', () => {
        it('renders a rectangle from the passed grid', () => {
            // mock container offsetWidth and offsetHeight because there's no setter
            // https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
            Object.defineProperties(container, {
                offsetWidth: { value: 30 },
                offsetHeight: { value: 30 }
            })

            dom.render(grid)

            const expectedStart = Hex(-1).coordinates()

            function expectedGridRectangleResult(actualHexes) {
                const expectedHexes = grid.rectangle(5, 5, expectedStart)

                // every actual hex...
                return actualHexes.every(actualHex => {
                    // ...should equal at least 1 expected hex
                    return expectedHexes.some(expectedHex => {
                        return JSON.stringify(actualHex) === JSON.stringify(expectedHex)
                    })
                })
            }

            expect(grid.rectangle).to.have.been.calledWith(5, 5, sinon.match(expectedStart))
            expect(dom.renderHexes).to.have.been.calledWith(sinon.match(expectedGridRectangleResult, 'array of hexes'))
        })
    })
})
