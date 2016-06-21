import prototype from './prototype'
import Hex from '../../hex'

export default function DOM({ container, hex }) {
    Hex.prototype.element(hex.element)

    return Object.assign(Object.create(prototype), { container })
}
