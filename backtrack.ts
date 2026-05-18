import type { Board, Placement, Piece, GameState } from './pieces'
import { deepCopyBoard } from './tools'
import { canPlace, placeOnBoard, removeFromBoard } from './placeRemove'

// backtracking solver - receives all state explicitly
export function backtrack(
  idx: number,
  pieces: Piece[],
  board: Board,
  placements: Placement[],
  state: GameState
): void {
  if (state.found) return

  if (idx === pieces.length) {
    state.solvedBoard = deepCopyBoard(board)
    state.found = true

    return
  }

  const piece = pieces[idx]

  for (let v = 0; v < piece.variants.length && !state.found; v++) {
    const variant = piece.variants[v]

    for (let r = 0; r <= board.length - variant.rows && !state.found; r++) {
      for (
        let c = 0;
        c <= board[0].length - variant.cols && !state.found;
        c++
      ) {
        if (!canPlace(board, variant, r, c)) continue

        placeOnBoard(board, variant, r, c, piece.id)

        placements.push({
          id: piece.id,
          variantTransform: variant.transform,
          variantIndex: v,
          row: r,
          col: c,
        })

        backtrack(idx + 1, pieces, board, placements, state)

        if (state.found) return

        placements.pop()

        removeFromBoard(board, variant, r, c)
      }
    }
  }
}
