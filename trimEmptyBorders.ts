export function trimEmptyBorders(mask: number[][]): number[][] {
  // remove non-zero rows/cols outside the bounding box
  let top = 0
  let bottom = mask.length - 1
  let left = 0
  let right = mask[0].length

  // top + bottom
  while (top <= bottom && mask[top].every((cell) => cell === 0)) top++
  while (bottom >= top && mask[bottom].every((cell) => cell === 0)) bottom--

  // left + right
  while (left <= right && mask.every((row) => row[left] === 0)) left++
  while (right >= left && mask.every((row) => row[right] === 0)) right--

  if (top > bottom || left > right) return [[0]]

  const output: number[][] = []

  for (let r = top; r <= bottom; r++) {
    output.push(mask[r].slice(left, right + 1))
  }

  return output
}
