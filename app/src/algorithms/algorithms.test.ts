import { ALGORITHMS } from './registry'

import type { SortStep } from './types'

const inputs: number[][] = [
  [],
  [1],
  [2, 1],
  [5, 3, 8, 1, 9, 2, 7],
  [1, 2, 3, 4, 5, 6],
  [6, 5, 4, 3, 2, 1],
  [3, 1, 3, 2, 1, 3],
  Array.from({ length: 40 }, (_, index) => (index * 37) % 23),
]

describe.each(ALGORITHMS)('$name', (algorithm) => {
  test.each(inputs)('sorts %j', (...input: number[]) => {
    const steps: SortStep[] = Array.from(algorithm.sort(input))
    const last = steps[steps.length - 1]
    const expected = [...input].sort((a, b) => a - b)

    expect(last.array).toEqual(expected)
    expect(last.type).toBe('sorted')
    expect(last.sorted).toHaveLength(input.length)
  })

  test('does not change the input array', () => {
    const input = [3, 2, 1]

    Array.from(algorithm.sort(input))
    expect(input).toEqual([3, 2, 1])
  })

  test('counters never decrease', () => {
    const steps = Array.from(algorithm.sort([4, 2, 5, 1, 3]))

    for (let i = 1; i < steps.length; i++) {
      expect(steps[i].comparisons).toBeGreaterThanOrEqual(steps[i - 1].comparisons)
      expect(steps[i].swaps).toBeGreaterThanOrEqual(steps[i - 1].swaps)
    }
  })
})

describe('known operation counts', () => {
  test('bubble sort on sorted array makes one pass without swaps', () => {
    const steps = Array.from(ALGORITHMS[0].sort([1, 2, 3, 4, 5]))
    const last = steps[steps.length - 1]

    expect(last.comparisons).toBe(4)
    expect(last.swaps).toBe(0)
  })

  test('selection sort always makes n(n-1)/2 comparisons', () => {
    const steps = Array.from(ALGORITHMS[1].sort([5, 1, 4, 2, 3]))

    expect(steps[steps.length - 1].comparisons).toBe(10)
  })
})
