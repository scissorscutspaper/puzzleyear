import { Shape, Variant } from './pieces'
import { cloneMatrix, flip, maskKey, rotate, shapeToMask } from './tools'
import { trimEmptyBorders } from './trimEmptyBorders'

// rotations, flips, variant generation
export function generateVariants(shape: Shape): Variant[] {
  const baseMask = shapeToMask(shape)
  const variants: Variant[] = []

  const seen = new Set<string>()

  const tries: {
    mask: Shape
    transform: string
  }[] = []

  const mtxA = cloneMatrix(baseMask)
  const mtxB = rotate(mtxA)
  const mtxC = rotate(mtxB)
  const mtxD = rotate(mtxC)

  tries.push({ mask: mtxA, transform: 'mtxA' })
  tries.push({ mask: mtxB, transform: 'mtxB' })
  tries.push({ mask: mtxC, transform: 'mtxC' })
  tries.push({ mask: mtxD, transform: 'mtxD' })

  const toAdd: typeof tries = []

  for (const t of tries) {
    toAdd.push({ mask: flip(t.mask), transform: `f${t.transform}` })
  }

  tries.push(...toAdd)

  for (const t of tries) {
    const trimmed = trimEmptyBorders(t.mask)
    const key = maskKey(trimmed)

    if (!seen.has(key)) {
      seen.add(key)

      variants.push({
        mask: trimmed,
        rows: trimmed.length,
        cols: trimmed[0].length,
        key,
        transform: t.transform,
      })
    }
  }

  return variants
}
