import type { SortStep } from '../algorithms/types'
import type { BarState } from '@sort-visualizer/ui-library'

// Превращает шаг алгоритма в цвета столбцов для компонента ArrayBars
export function getBarStates(step: SortStep | null): Partial<Record<number, BarState>> {
  const states: Partial<Record<number, BarState>> = {}

  if (!step) {
    return states
  }

  step.sorted.forEach((index) => {
    states[index] = 'sorted'
  })

  if (step.type === 'compare') {
    step.indices.forEach((index) => {
      states[index] = 'compare'
    })
  }

  if (step.type === 'swap' || step.type === 'overwrite') {
    step.indices.forEach((index) => {
      states[index] = 'swap'
    })
  }

  return states
}
