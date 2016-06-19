import { stringToDOMNodes } from '../../utils'
import prototype from './prototype'

export default function DOM({ container, hexElement }) {
    const hexNode = stringToDOMNodes(hexElement)[0]
    return Object.assign(Object.create(prototype), { container, hexNode })
}
