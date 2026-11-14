import { ALGORITHMS, findAlgorithm } from './registry'

describe('algorithm registry', () => {
  test('contains six algorithms with unique ids', () => {
    const ids = new Set(ALGORITHMS.map((algorithm) => algorithm.id))

    expect(ALGORITHMS).toHaveLength(6)
    expect(ids.size).toBe(6)
  })

  test('finds algorithm by id', () => {
    expect(findAlgorithm('quick')?.name).toBe('Быстрая сортировка')
  })

  test('returns undefined for unknown id', () => {
    expect(findAlgorithm('unknown')).toBeUndefined()
    expect(findAlgorithm(undefined)).toBeUndefined()
  })
})
