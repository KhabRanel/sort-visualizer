import type { AlgorithmInfo } from './types'

export const ALGORITHMS: AlgorithmInfo[] = [
  { id: 'bubble', name: 'Сортировка пузырьком', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', memory: 'O(1)', stable: true },
  { id: 'selection', name: 'Сортировка выбором', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', memory: 'O(1)', stable: false },
  { id: 'insertion', name: 'Сортировка вставками', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', memory: 'O(1)', stable: true },
  { id: 'merge', name: 'Сортировка слиянием', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', memory: 'O(n)', stable: true },
  { id: 'quick', name: 'Быстрая сортировка', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', memory: 'O(log n)', stable: false },
  { id: 'heap', name: 'Пирамидальная сортировка', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', memory: 'O(1)', stable: false },
]

export function findAlgorithm(id: string | undefined): AlgorithmInfo | undefined {
  return ALGORITHMS.find((algorithm) => algorithm.id === id)
}
