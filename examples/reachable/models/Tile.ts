import { Container, Text } from '@svgdotjs/svg.js'
import { defineHex } from '../../../src'
import { TileState } from './TileState'

const WALL_LABEL = 'wall'

export class Tile extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  private _state: TileState = TileState.DEFAULT
  private _distance: number = 0
  private _svg!: Container

  get state() {
    return this._state
  }

  set state(newState: TileState) {
    this.updateCSSClass(newState)
    this._state = newState
    this.updateLabel()
  }

  get distance() {
    return this._distance
  }

  set distance(newDistance: number) {
    this._distance = newDistance
    this.updateLabel()
  }

  get svg() {
    return this._svg
  }

  set svg(svg: Container) {
    this._svg = svg
  }

  private updateCSSClass(newState: TileState) {
    this._svg.removeClass(this._state)
    this._svg.addClass(newState)
  }

  private updateLabel() {
    const label = this._state === TileState.OBSTACLE ? WALL_LABEL : this._distance.toString()
    this.setSVGLabel(label)
  }

  private setSVGLabel(label: string) {
    const text = this._svg.findOne('text') as Text
    if (text) {
      text.text(label)
    }
  }

  toggleState() {
    if (this._state !== TileState.START_ITEM) {
      this.state = this._state === TileState.OBSTACLE ? TileState.REACHABLE : TileState.OBSTACLE
    }
  }
}
