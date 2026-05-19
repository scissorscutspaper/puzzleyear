import { generateVariants } from './generateVariants'
import { Board, Placement, Shape, Variant } from './pieces'
import { canPlace, placeOnBoard, removeFromBoard } from './placeRemove'
import { deepCopyBoard } from './tools'

/**
 * Instead of trying every position for a piece, it finds the first empty cell and only tries placements that cover the cell.
 * This reduces branching and is standard exact-cover optimization.
 *
 * tracks: nodesVisited, placementsTried, maxDepth
 */
export function findFirstEmpty(board: Board): [number, number] | null {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c] === 0) return [r, c]
    }
  }

  return null
}

// performance instrumentation
// branching and depth
// stats container
export interface SolverStats {
  nodesVisited: number
  placementsTried: number
  maxDepth: number
}

// visual board printer
// readable, stable, and debuggable
const ID_TO_CHAR: Record<number, string> = {
  '-1': '▤',
  0: '⋅',
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'J',
  5: 'L',
  6: 'P',
  7: 'S',
  8: 'T',
  9: 'Z',
}

export function printBoard(board: Board): void {
  console.log(
    board.map((row) => row.map((cell) => ID_TO_CHAR[cell]).join(' ')).join('\n')
  )
}

// Memoize generateVariants per mino id
// variants never change, so compute once.
const VARIANT_CACHE = new Map<number, Variant[]>()

export function getVariants(id: number, shape: Shape): Variant[] {
  if (!VARIANT_CACHE.has(id)) {
    VARIANT_CACHE.set(id, generateVariants(shape))
  }

  return VARIANT_CACHE.get(id)!
}

// updated backtracking solver (with all improvements)
// uses first empty cell
// tracks stats
// has no closures
// is fully module-safe

export function backtrack(
  idx: number,
  pieces: { id: number; variants: Variant[] }[],
  board: Board,
  placements: Placement[],
  state: { found: boolean; solvedBoard: Board | null },
  stats: SolverStats
): void {
  if (state.found) return

  stats.nodesVisited++
  stats.maxDepth = Math.max(stats.maxDepth, idx)

  if (idx === pieces.length) {
    state.solvedBoard = deepCopyBoard(board)
    state.found = true
    return
  }

  const empty = findFirstEmpty(board)
  if (!empty) return

  const [targetR, targetC] = empty
  const piece = pieces[idx]

  for (let v = 0; v < piece.variants.length && !state.found; v++) {
    const variant = piece.variants[v]

    for (let r = targetR - variant.rows + 1; r <= targetR; r++) {
      for (let c = targetC - variant.cols + 1; c <= targetC; c++) {
        if (!canPlace(board, variant, r, c)) continue
        if (variant.mask[targetR - r]?.[targetC - c] !== 1) continue

        stats.placementsTried++

        placeOnBoard(board, variant, r, c, piece.id)
        placements.push({
          id: piece.id,
          variantTransform: variant.transform,
          variantIndex: v,
          row: r,
          col: c,
        })

        backtrack(idx + 1, pieces, board, placements, state, stats)

        if (state.found) return

        placements.pop()
        removeFromBoard(board, variant, r, c)
      }
    }
  }
}
