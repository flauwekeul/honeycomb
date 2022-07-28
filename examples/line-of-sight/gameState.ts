import { GameState } from './types'

export const initialGameState: Readonly<GameState> = {
  playerCoordinates: [0, 7],
}

const updateListeners: { keys: [keyof GameState]; listener: gameStateListener }[] = []
export const onUpdate = (keys: [keyof GameState], listener: gameStateListener) => {
  updateListeners.push({ keys, listener })
}

let currentState: GameState = { ...initialGameState }
export function updateGameState(newState: Partial<GameState>) {
  currentState = { ...currentState, ...newState }
  const updatedKeys = Object.keys(newState)

  updateListeners
    .filter(({ keys }) => keys.some((key) => updatedKeys.includes(key)))
    .forEach(({ listener }) => listener(currentState))
}

type gameStateListener = (newState: Readonly<GameState>) => void
