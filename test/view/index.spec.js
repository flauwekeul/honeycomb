import 'jsdom-global/register'
import { expect } from 'chai'
import sinon from 'sinon'

import ViewFactory from '../../src/view'

describe('View creation', function() {
    let Point, isDom, View, Hex, grid

    before(function() {
        Point = sinon.stub().callsFake(value => value)
        isDom = sinon.stub().returns(true)
        View = ViewFactory({ Point, isDom })
        Hex = sinon.spy()
        grid = sinon.stub().returns({ Hex })
    })

    it('calls isDom to check if the container is a valid DOM element', function() {
        const container = document.createElement('div')
        View({ container, grid })
        expect(isDom).to.have.been.calledWith(container)
    })

    it('throws an error if the container is not a valid DOM element', function() {
        isDom.returns(false)
        expect(View).to.throw('Container is not a valid DOM element: undefined.')
    })

    describe('with valid options', function() {
        let template, container, origin

        before(function() {
            template = sinon.spy()
            container = document.createElement('div')
            origin = [2, 3]
            isDom.returns(true)
        })

        it('wraps the passed origin in a Point', function() {
            View({ container, grid, origin })
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
    let Point, isDom, View

    before(function() {
        Point = sinon.stub().callsFake(value => value)
        isDom = sinon.stub().returns(true)
        View = ViewFactory({ Point, isDom })
    })

    describe('renderGrid', function() {
        let Hex, subtract, rectangle, grid, view, result

        before(function() {
            Hex = sinon.stub().returns('new hex result')
            subtract = sinon.stub().returns('subtract result')
            Hex.subtract = subtract
            rectangle = sinon.stub().returns('rectangle result')
            grid = { Hex, rectangle }
            view = View({ grid, container: document.createElement('div') })
            sinon.stub(view, 'width').returns(1)
            sinon.stub(view, 'height').returns(1)
            sinon.stub(view, 'pixelToHex').returns('pixelToHex result')
            sinon.stub(view, 'renderHexes')
            result = view.renderGrid()
        })

        it('gets the view\'s width', function() {
            expect(view.width).to.have.been.called
        })

        it('gets the view\'s height', function() {
            expect(view.height).to.have.been.called
        })

        describe('when no padding is passed', function() {
            it('calculates the start hex by subtracting 1 hex from the top left hex', function() {
                expect(view.pixelToHex).to.have.been.calledWith(0)
                expect(Hex).to.have.been.calledWith(1)
                expect(subtract).to.have.been.calledWith('pixelToHex result', 'new hex result')
            })

            it('creates a rectangle of hexes that\'s 3 hexes greater than can fit in the view', function() {
                expect(rectangle).to.have.been.calledWith(4, 4, 'subtract result')
            })
        })

        describe('when padding is passed', function() {
            it('calculates the start hex by subtracting half the padding amount of hexes (rounded down) from the top left hex', function() {
                result = view.renderGrid(0)
                expect(Hex).to.have.been.calledWith(0)
                result = view.renderGrid(5)
                expect(Hex).to.have.been.calledWith(2)
            })

            it('creates a rectangle of hexes that\'s padding hexes greater than can fit in the view', function() {
                result = view.renderGrid(0)
                expect(rectangle).to.have.been.calledWith(1, 1, 'subtract result')
                result = view.renderGrid(5)
                expect(rectangle).to.have.been.calledWith(6, 6, 'subtract result')
            })
        })

        it('calls renderHexes with the created rectangle of hexes', function() {
            expect(view.renderHexes).to.have.been.calledWith('rectangle result')
        })

        it('returns the view', function() {
            expect(result).to.equal(view)
        })
    })

    describe('renderHexes', function() {
        let element, template, container, view, hexesToRender, result

        before(function() {
            element = document.createElement('hex')
            template = sinon.stub().returns(element)
            container = document.createElement('div')
            sinon.spy(container, 'appendChild')
            view = View({ template, container })
            hexesToRender = [ 'a hex' ]
            result = view.renderHexes(hexesToRender)
        })

        after(function() {
            container.appendChild.restore()
        })

        it('compiles each hex by passing it to the view\'s template', function() {
            expect(template).to.have.been.calledWith(hexesToRender[0])
        })

        it('renders each hex by appending the rendered hex to a document fragment', function() {
            expect(container.appendChild).to.have.been.calledWith(document.createDocumentFragment())
        })

        it('appends the rendered hexes to the view\'s container', function() {
            expect(container.firstChild).to.eql(element)
        })

        it('updates the view\'s hexes', function() {
            expect(result.hexes).to.eql(hexesToRender)
        })

        it('returns the view', function() {
            expect(result).to.eql(view)
        })
    })

    describe('hexToPixel', function() {
        let add, hexToPoint, origin, view, result

        before(function() {
            add = sinon.stub().returns('add result')
            hexToPoint = sinon.stub().returns({ add })
            origin = 'origin'
            view = View({ grid: { hexToPoint }, origin, container: document.createElement('div') })
            result = view.hexToPixel('some hex')
        })

        it('gets the grid\'s point for the passed hex', function() {
            expect(hexToPoint).to.have.been.calledWith('some hex')
        })

        it('adds the view\'s origin to that point', function() {
            expect(add).to.have.been.calledWith(origin)
        })

        it('returns the result', function() {
            expect(result).to.equal('add result')
        })
    })

    describe('pixelToHex', function() {
        let subtract, Point, pointResult, View, pointToHex, origin, view, result

        before(function() {
            subtract = sinon.stub().returns('subtract result')
            // sinon doesn't support stubbing factories, this is a way to "fix" that
            pointResult = value => ({ value, subtract })
            Point = sinon.stub().callsFake(pointResult)
            View = ViewFactory({ Point, isDom })
            pointToHex = sinon.stub().returns('pointToHex result')
            origin = 'origin'
            view = View({ grid: { pointToHex }, origin, container: document.createElement('div') })
            result = view.pixelToHex('some pixel')
        })

        it('ensures the passed pixel is a point', function() {
            expect(Point).to.have.been.calledWith('some pixel')
        })

        it('subtracts the view\'s origin from that point', function() {
            expect(subtract).to.have.been.calledWith(pointResult(origin))
        })

        it('gets the grid\'s hex for the point relative to the origin', function() {
            expect(pointToHex).to.have.been.calledWith('subtract result')
        })

        it('returns the result', function() {
            expect(result).to.equal('pointToHex result')
        })
    })

    describe('width', function() {
        let colSize, container, view, result

        before(function() {
            colSize = sinon.stub().returns(2)
            container = {
                getBoundingClientRect() {
                    return { width: 3 }
                }
            }
            view = View({ grid: { colSize }, container })
            result = view.width()
        })

        it('gets the grid\'s colSize', function() {
            expect(colSize).to.have.been.called
        })

        it('returns the rounded container\'s pixel width divided by the grid\'s colSize', function() {
            expect(result).to.equal(2)
        })
    })

    describe('height', function() {
        let rowSize, container, view, result

        before(function() {
            rowSize = sinon.stub().returns(2)
            container = {
                getBoundingClientRect() {
                    return { height: 3 }
                }
            }
            view = View({ grid: { rowSize }, container })
            result = view.height()
        })

        it('gets the grid\'s rowSize', function() {
            expect(rowSize).to.have.been.called
        })

        it('returns the rounded container\'s pixel height divided by the grid\'s rowSize', function() {
            expect(result).to.equal(2)
        })
    })
})
