import { StepRecorder } from './StepRecorder'

import type { SortStep } from './types'

function* sortRange(recorder: StepRecorder, left: number, right: number): Generator<SortStep> {
  if (left >= right) {
    return
  }

  const array = recorder.array
  const middle = Math.floor((left + right) / 2)

  yield* sortRange(recorder, left, middle)
  yield* sortRange(recorder, middle + 1, right)

  // слияние двух отсортированных половин во временный массив
  const merged: number[] = []
  let i = left
  let j = middle + 1

  while (i <= middle && j <= right) {
    yield recorder.compare(i, j)

    if (array[i] <= array[j]) {
      merged.push(array[i])
      i++
    } else {
      merged.push(array[j])
      j++
    }
  }

  while (i <= middle) {
    merged.push(array[i])
    i++
  }

  while (j <= right) {
    merged.push(array[j])
    j++
  }

  // запись результата обратно в массив
  for (let k = 0; k < merged.length; k++) {
    yield recorder.overwrite(left + k, merged[k])
  }
}

export function* mergeSort(input: number[]): Generator<SortStep> {
  const recorder = new StepRecorder(input)

  yield* sortRange(recorder, 0, input.length - 1)
  yield recorder.finish()
}
