import { StepRecorder } from './StepRecorder'

import type { SortStep } from './types'

// Разбиение Ломуто: опорный элемент - последний элемент диапазона
function* sortRange(recorder: StepRecorder, low: number, high: number): Generator<SortStep> {
  if (low > high) {
    return
  }

  if (low === high) {
    yield recorder.markSorted(low)

    return
  }

  const array = recorder.array
  let border = low

  for (let i = low; i < high; i++) {
    yield recorder.compare(i, high)

    if (array[i] < array[high]) {
      if (i !== border) {
        yield recorder.swap(i, border)
      }

      border++
    }
  }

  if (border !== high) {
    yield recorder.swap(border, high)
  }

  // опорный элемент встал на своё место
  yield recorder.markSorted(border)
  yield* sortRange(recorder, low, border - 1)
  yield* sortRange(recorder, border + 1, high)
}

export function* quickSort(input: number[]): Generator<SortStep> {
  const recorder = new StepRecorder(input)

  yield* sortRange(recorder, 0, input.length - 1)
  yield recorder.finish()
}
