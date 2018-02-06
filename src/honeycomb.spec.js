/* eslint-env mocha */

import { expect } from 'chai'

import * as API from './honeycomb'

describe('API', function() {
    it('has a extendHex function', function() {
        expect(API).to.have.property('extendHex').that.is.a('function').with.property('name', 'extendHex')
    })

    it('has a defineGrid function', function() {
        expect(API).to.have.property('defineGrid').that.is.a('function').with.property('name', 'defineGrid')
    })

    it('exposes the Point factory', function() {
        expect(API).to.have.property('Point').that.is.a('function').with.property('name', 'Point')
    })
})
