import { Board, MINOS, Mino, Shape } from './pieces'

interface Visit {
  [coord: string]: boolean
}

function countIslands(grid: Board): { islands: Shape[]; total: number } {
  const visited: Visit = {}
  const islands = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const coord = `${i}-${j}`

      if (grid[i][j] === 0 && !visited[coord]) {
        const current = findNeighbors(i, j, visited, grid)

        if (current) {
          islands.push(current)
        }
      }
    }
  }

  return { islands, total: islands.length }
}

function findNeighbors(
  x: number,
  y: number,
  visited: Visit,
  grid: Board
): Shape {
  const coord = `${x}-${y}`

  // conditional guard
  if (visited[coord]) return []

  visited[coord] = true
  const neighbors: number[][] = [[x, y]]

  const tryPush = (nx: number, ny: number) => {
    if (nx < 0 || ny < 0) return

    if (!grid[nx] || grid[nx][ny] !== 0) return

    neighbors.push(...findNeighbors(nx, ny, visited, grid))
  }

  tryPush(x, y - 1) // left
  tryPush(x, y + 1) // right
  tryPush(x - 1, y) // up
  tryPush(x + 1, y) // down

  return neighbors
}

const a = 'a'.charCodeAt(0)
const b = 'b'.charCodeAt(0)
const c = 'c'.charCodeAt(0)
const d = 'd'.charCodeAt(0)
const e = 'e'.charCodeAt(0)
const f = 'f'.charCodeAt(0)

const mx = [
  [2, a, a, a, 3, 3, -1],
  [2, 2, a, a, 3, -1, -1],
  [2, 2, a, 5, 3, 3, b],
  [c, 7, 7, 5, d, 6, b],
  [c, 7, e, 5, 6, 6, 6],
  [7, 7, e, 5, 5, 6, f],
  [-1, -1, e, e, -1, -1, -1],
]

const mxOpen = [
  [2, 0, 0, 0, 3, 3, -1],
  [2, 2, 0, 0, 3, -1, -1],
  [2, 2, 0, 5, 3, 3, 0],
  [0, 7, 7, 5, 0, 6, 0],
  [0, 7, 0, 5, 6, 6, 6],
  [7, 7, 0, 5, 5, 6, 0],
  [-1, -1, 0, 0, -1, -1, -1],
]

export function squareCount(piece: Shape): number {
  let squares = 0

  for (const row of piece) {
    for (const cell of row) {
      cell > 0 ? squares++ : false
    }
  }

  return squares
}

function checkOpen(board: Board, unused: Shape[]) {
  const { islands, total } = countIslands(board)
  const minos = unused.length
  if (total !== unused.length)
    return {
      open: false,
      message:
        total < unused.length
          ? `Only ${total} openings and ${minos} minos.`
          : `Only ${minos} minos and ${total} openings.`,
    }

  const islandSizes: Record<number, number> = {}
  const pieceSizes: Record<number, number> = {}

  for (const isle of islands) {
    const size = isle.length

    if (!islandSizes[size]) islandSizes[size] = 0
    islandSizes[size] += 1
  }

  for (const piece of unused) {
    const size = squareCount(piece)
    if (!pieceSizes[size]) pieceSizes[size] = 0
    pieceSizes[size] += 1
  }

  const comps = compareCounts(islandSizes, pieceSizes)

  return comps
}

interface CountComparison {
  size: string
  islands: number
  pieces: number
  delta: number
  match: boolean
}

function compareCounts(
  islands: Record<string, number>,
  pieces: Record<string, number>
): {
  comparisons: CountComparison[]
  allMatch: boolean
} {
  const keys = Array.from(
    new Set([...Object.keys(islands), ...Object.keys(pieces)])
  ).sort((a, b) => Number(a) - Number(b))

  const comparisons: CountComparison[] = keys.map((k) => {
    const i = islands[k] ?? 0
    const p = pieces[k] ?? 0

    return { size: k, islands: i, pieces: p, delta: p - i, match: i === p }
  })
  const allMatch = comparisons.every((c) => c.match)
  return { comparisons, allMatch }
}
