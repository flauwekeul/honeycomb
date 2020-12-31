import { AxialCoordinates } from '../types'

export const equals = (hexA: AxialCoordinates, hexB: AxialCoordinates) => hexA.q === hexB.q && hexA.r === hexB.r
