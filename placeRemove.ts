import type { Board, Variant } from './pieces'

export function canPlace(
  board: Board,
  variant: Variant,
  top: number,
  left: number
): boolean {
  const rN = board.length
  const cN = board[0].length

  if (
    top < 0 ||
    left < 0 ||
    top + variant.rows > rN ||
    left + variant.cols > cN
  )
    return false

  for (let r = 0; r < variant.rows; r++) {
    for (let c = 0; c < variant.cols; c++) {
      if (variant.mask[r][c] === 1) {
        const br = top + r
        const bc = left + c

        const cell = board[br][bc]

        // either -1 or already placed mino (non-zero)
        if (cell !== 0) return false
      }
    }
  }

  return true
}

export function placeOnBoard(
  board: Board,
  variant: Variant,
  top: number,
  left: number,
  id: number
): void {
  for (let r = 0; r < variant.rows; r++) {
    for (let c = 0; c < variant.cols; c++) {
      if (variant.mask[r][c] === 1) {
        board[top + r][left + c] = id
      }
    }
  }
}

export function removeFromBoard(
  board: Board,
  variant: Variant,
  top: number,
  left: number
): void {
  for (let r = 0; r < variant.rows; r++) {
    for (let c = 0; c < variant.cols; c++) {
      if (variant.mask[r][c] === 1) {
        board[top + r][left + c] = 0
      }
    }
  }
}
