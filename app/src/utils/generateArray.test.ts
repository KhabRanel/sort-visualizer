import { generateArray } from './generateArray'

describe('generateArray', () => {
  test('creates sorted array', () => {
    expect(generateArray(5, 'sorted')).toEqual([1, 2, 3, 4, 5])
  })

  test('creates reversed array', () => {
    expect(generateArray(4, 'reversed')).toEqual([4, 3, 2, 1])
  })

  test('creates nearly sorted array with one swapped pair', () => {
    expect(generateArray(5, 'nearlySorted', () => 0)).toEqual([2, 1, 3, 4, 5])
  })

  test('creates random array of given size and range', () => {
    const array = generateArray(10, 'random')

    expect(array).toHaveLength(10)
    expect(array.every((value) => value >= 1 && value <= 10)).toBe(true)
  })
})
