export type AlgorithmId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap'

export type StepType = 'compare' | 'swap' | 'overwrite' | 'sorted'

// Один шаг (кадр) анимации
export interface SortStep {
  type: StepType
  // элементы, участвующие в шаге
  indices: number[]
  // состояние массива после шага
  array: number[]
  // индексы элементов, которые уже стоят на своих местах
  sorted: number[]
  // сколько сравнений и перестановок сделано с начала сортировки
  comparisons: number
  swaps: number
}

// Алгоритм сортировки - функция-генератор, которая по очереди возвращает шаги
export type SortFunction = (array: number[]) => Generator<SortStep>

export interface AlgorithmInfo {
  id: AlgorithmId
  name: string
  best: string
  average: string
  worst: string
  memory: string
  stable: boolean
  sort: SortFunction
}
