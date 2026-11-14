import { StepRecorder } from './StepRecorder'

import type { SortStep } from './types'

export function* selectionSort(input: number[]): Generator<SortStep> {
  const recorder = new StepRecorder(input)
  const array = recorder.array

  for (let i = 0; i < array.length - 1; i++) {
    let min = i

    for (let j = i + 1; j < array.length; j++) {
      yield recorder.compare(min, j)

      if (array[j] < array[min]) {
        min = j
      }
    }

    if (min !== i) {
      yield recorder.swap(i, min)
    }

    yield recorder.markSorted(i)
  }

  yield recorder.finish()
}
