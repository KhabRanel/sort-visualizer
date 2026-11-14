import type { SortStep, StepType } from './types'

// Помощник для алгоритмов: работает с копией массива,
// считает сравнения и перестановки и создаёт шаги анимации
export class StepRecorder {
  readonly array: number[]
  private comparisons = 0
  private swaps = 0
  private sorted = new Set<number>()

  constructor(input: number[]) {
    this.array = [...input]
  }

  compare(i: number, j: number): SortStep {
    this.comparisons++

    return this.createStep('compare', [i, j])
  }

  swap(i: number, j: number): SortStep {
    const temp = this.array[i]

    this.array[i] = this.array[j]
    this.array[j] = temp
    this.swaps++

    return this.createStep('swap', [i, j])
  }

  // запись значения на позицию (используется в сортировке слиянием)
  overwrite(index: number, value: number): SortStep {
    this.array[index] = value
    this.swaps++

    return this.createStep('overwrite', [index])
  }

  markSorted(index: number): SortStep {
    this.sorted.add(index)

    return this.createStep('sorted', [index])
  }

  // последний шаг: все элементы на своих местах
  finish(): SortStep {
    const all = this.array.map((_, index) => index)

    all.forEach((index) => this.sorted.add(index))

    return this.createStep('sorted', all)
  }

  private createStep(type: StepType, indices: number[]): SortStep {
    return {
      type,
      indices,
      array: [...this.array],
      sorted: [...this.sorted],
      comparisons: this.comparisons,
      swaps: this.swaps,
    }
  }
}
