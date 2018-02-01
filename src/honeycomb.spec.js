/* eslint-env mocha */

import { expect } from 'chai'

import * as API from './honeycomb'
import { OFFSETS, ORIENTATIONS } from './hex/constants'
import createHexFactory from './hex'
import Point from './point'

describe('API', function() {
    it('exposes a Hex namespace', function() {
        expect(API).to.have.property('Hex').that.eqls({
            OFFSETS,
            ORIENTATIONS,
            createFactory: createHexFactory
        })
    })

    it('exposes a Grid namespace', function() {
        expect(API).to.have.property('Grid')
            .that.is.an('object')
            .with.property('createFactory')
            .that.is.a('function')
            .with.property('name', 'createFactory')
    })

    it('exposes the Point factory', function() {
        expect(API).to.have.property('Point').that.eqls(Point)
    })
})
