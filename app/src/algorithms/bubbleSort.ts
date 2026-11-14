import { StepRecorder } from './StepRecorder'

import type { SortStep } from './types'

export function* bubbleSort(input: number[]): Generator<SortStep> {
  const recorder = new StepRecorder(input)
  const array = recorder.array

  for (let end = array.length - 1; end > 0; end--) {
    let swapped = false

    for (let i = 0; i < end; i++) {
      yield recorder.compare(i, i + 1)

      if (array[i] > array[i + 1]) {
        yield recorder.swap(i, i + 1)
        swapped = true
      }
    }

    // если за проход не было обменов, массив уже отсортирован
    if (!swapped) {
      break
    }

    yield recorder.markSorted(end)
  }

  yield recorder.finish()
}
