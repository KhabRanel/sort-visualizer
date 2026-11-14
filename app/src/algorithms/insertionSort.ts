import { StepRecorder } from './StepRecorder'

import type { SortStep } from './types'

export function* insertionSort(input: number[]): Generator<SortStep> {
  const recorder = new StepRecorder(input)
  const array = recorder.array

  for (let i = 1; i < array.length; i++) {
    // сдвигаем элемент влево, пока он не встанет на своё место
    for (let j = i; j > 0; j--) {
      yield recorder.compare(j - 1, j)

      if (array[j - 1] <= array[j]) {
        break
      }

      yield recorder.swap(j - 1, j)
    }
  }

  yield recorder.finish()
}
