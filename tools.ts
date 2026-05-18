import { Board, Shape } from './pieces'

export function cloneMatrix(m: Shape): Shape {
  return m.map((row) => row.slice())
}

export function countCells(shape: Shape): number {
  return shape.reduce(
    (acc, row) => acc + row.reduce((s, v) => s + (v === 0 ? 0 : 1), 0),
    0
  )
}

export function deepCopyBoard(b: Board): Board {
  return b.map((r) => r.slice())
}

export function flip(mask: Shape): Shape {
  return mask.map((row) => row.slice().reverse())
}

export function maskKey(mask: Shape): string {
  return mask.map((row) => row.join(',')).join('|')
}

export function rotate(mask: Shape): Shape {
  const r = mask.length
  const c = mask[0].length
  const out: Shape = Array.from({ length: c }, () => Array(r).fill(0))

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      out[j][r - 1 - i] = mask[i][j]
    }
  }
  return out
}

export function shapeToMask(shape: Shape): Shape {
  return shape.map((row) => row.map((cell) => (cell === 0 ? 0 : 1)))
}
