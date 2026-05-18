// board types and helper functions
export type Board = number[][]
export type Shape = number[][]
export interface Mino {
  piece: string
  id: number
  shape: Shape
}
export interface Placement {
  id: number
  variantTransform: string
  variantIndex: number
  row: number
  col: number
}

export interface Variant {
  mask: number[][]
  rows: number
  cols: number
  key: string
  transform: string
}

export interface Piece {
  id: number
  variants: Variant[]
}

export interface GameState {
  found: boolean
  solvedBoard: Board | null
}

export const BASE_BOARD: Board = [
  [0, 0, 0, 0, 0, 0, -1],
  [0, 0, 0, 0, 0, 0, -1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [-1, -1, 0, 0, 0, -1, -1],
]

export const REFERENCE_BOARD = new Map<string, [number, number]>([
  ['jan', [0, 0]],
  ['feb', [0, 1]],
  ['mar', [0, 2]],
  ['apr', [0, 3]],
  ['may', [0, 4]],
  ['jun', [0, 5]],
  ['jul', [1, 0]],
  ['aug', [1, 1]],
  ['sep', [1, 2]],
  ['oct', [1, 3]],
  ['nov', [1, 4]],
  ['dec', [1, 5]],
  ['1', [2, 0]],
  ['2', [2, 1]],
  ['3', [2, 2]],
  ['4', [2, 3]],
  ['5', [2, 4]],
  ['6', [2, 5]],
  ['7', [2, 6]],
  ['8', [3, 0]],
  ['9', [3, 1]],
  ['10', [3, 2]],
  ['11', [3, 3]],
  ['12', [3, 4]],
  ['13', [3, 5]],
  ['14', [3, 6]],
  ['15', [4, 0]],
  ['16', [4, 1]],
  ['17', [4, 2]],
  ['18', [4, 3]],
  ['19', [4, 4]],
  ['20', [4, 5]],
  ['21', [4, 6]],
  ['22', [5, 0]],
  ['23', [5, 1]],
  ['24', [5, 2]],
  ['25', [5, 3]],
  ['26', [5, 4]],
  ['27', [5, 5]],
  ['28', [5, 6]],
  ['29', [6, 2]],
  ['30', [6, 3]],
  ['31', [6, 4]],
])

export const  MINOS: Mino[] = [
  {
    piece: 'A',
    id: 1,
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    piece: 'B',
    id: 2,
    shape: [
      [2, 0],
      [2, 2],
      [2, 2],
    ],
  },
  {
    piece: 'C',
    id: 3,
    shape: [
      [3, 3],
      [3, 0],
      [3, 3],
    ],
  },
  {
    piece: 'J',
    id: 4,
    shape: [
      [0, 4],
      [0, 4],
      [4, 4],
    ],
  },
  {
    piece: 'L',
    id: 5,
    shape: [
      [5, 0],
      [5, 0],
      [5, 0],
      [5, 5],
    ],
  },
  {
    piece: 'P',
    id: 6,
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 6, 0],
    ],
  },
  {
    piece: 'S',
    id: 7,
    shape: [
      [0, 7, 7],
      [0, 7, 0],
      [7, 7, 0],
    ],
  },
  {
    piece: 'T',
    id: 8,
    shape: [
      [8, 8, 8],
      [0, 8, 0],
    ],
  },
  {
    piece: 'Z',
    id: 9,
    shape: [
      [9, 9, 0],
      [0, 9, 9],
    ],
  },
]
