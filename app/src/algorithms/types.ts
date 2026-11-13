export type AlgorithmId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap'

export interface AlgorithmInfo {
  id: AlgorithmId
  name: string
  best: string
  average: string
  worst: string
  memory: string
  stable: boolean
}

// Один шаг алгоритма, который будет воспроизводить анимация (реализация - в MVP)
export interface SortStep {
  type: 'compare' | 'swap' | 'overwrite' | 'sorted'
  indices: number[]
  values?: number[]
}

export type SortFunction = (array: number[]) => Generator<SortStep>
