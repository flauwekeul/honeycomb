import { AxialCoordinates } from '../types'

// todo: move this into hex prototype, no need for separate function
export const toString = ({ q, r }: AxialCoordinates) => `${q},${r}`
