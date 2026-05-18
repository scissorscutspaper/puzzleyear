import { Board, Placement, MINOS, BASE_BOARD, REFERENCE_BOARD } from './pieces'
import { backtrack } from './backtrack'
import { countCells, deepCopyBoard } from './tools'
import { generateVariants } from './generateVariants'
import { prettyPrintBoard } from './printBoard'
interface SolverStats {
  nodesVisited: number
  placementsTried: number
  maxDepth: number
}

export function solve(monthKey: string, day: string | number) {
  console.log('solving! please wait...')
  const board: Board = deepCopyBoard(BASE_BOARD)

  const mk = monthKey.toLowerCase()
  const dk = String(day)

  const mCoords = REFERENCE_BOARD.get(mk)
  const dCoords = REFERENCE_BOARD.get(dk)

  if (!mCoords || !dCoords) {
    throw new Error(`Invalid month or day keys: ${mk}, ${dk}`)
  }

  board[mCoords[0]][mCoords[1]] = -1
  board[dCoords[0]][dCoords[1]] = -1

  const pieces = MINOS.map((m) => ({
    id: m.id,
    baseShape: m.shape,
    cells: countCells(m.shape),
    variants: generateVariants(m.shape),
  }))

  pieces.sort((a, b) => b.cells - a.cells)

  const placements: Placement[] = []
  const stats: SolverStats = {
    nodesVisited: 0,
    placementsTried: 0,
    maxDepth: 0,
  }

  const state = {
    found: false,
    solvedBoard: null as Board | null,
  }

  backtrack(0, pieces, board, placements, state)

  if (!state.solvedBoard) {
    throw new Error(
      'Solver failed to find a solution (unexpected for valid inputs.'
    )
  }

const result = {
  board: state.solvedBoard,
  placements,
  stats,
}  
console.log("RESULT:", result)
  return prettyPrintBoard(state.solvedBoard)

  // return {
  //   board: state.solvedBoard,
  //   placements,
  //   stats,
  // }
}

console.log(solve('sep', '23'))
