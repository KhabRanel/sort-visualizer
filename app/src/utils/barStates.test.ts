import { getBarStates } from './barStates'

import type { SortStep } from '../algorithms/types'

function createStep(type: SortStep['type'], indices: number[], sorted: number[] = []): SortStep {
  return { type, indices, sorted, array: [3, 2, 1], comparisons: 0, swaps: 0 }
}

describe('getBarStates', () => {
  test('returns empty object before animation starts', () => {
    expect(getBarStates(null)).toEqual({})
  })

  test('marks compared elements', () => {
    expect(getBarStates(createStep('compare', [0, 1], [2]))).toEqual({ 0: 'compare', 1: 'compare', 2: 'sorted' })
  })

  test('marks swapped and overwritten elements', () => {
    expect(getBarStates(createStep('swap', [0, 1]))).toEqual({ 0: 'swap', 1: 'swap' })
    expect(getBarStates(createStep('overwrite', [2]))).toEqual({ 2: 'swap' })
  })

  test('marks sorted elements', () => {
    expect(getBarStates(createStep('sorted', [0, 1, 2], [0, 1, 2]))).toEqual({ 0: 'sorted', 1: 'sorted', 2: 'sorted' })
  })
})
