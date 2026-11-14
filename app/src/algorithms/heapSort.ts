import { StepRecorder } from './StepRecorder'

import type { SortStep } from './types'

// Просеивание вниз: восстанавливает свойство кучи для элементов [0, end)
function* siftDown(recorder: StepRecorder, start: number, end: number): Generator<SortStep> {
  const array = recorder.array
  let root = start

  while (2 * root + 1 < end) {
    const left = 2 * root + 1
    const right = left + 1
    let largest = root

    yield recorder.compare(left, largest)

    if (array[left] > array[largest]) {
      largest = left
    }

    if (right < end) {
      yield recorder.compare(right, largest)

      if (array[right] > array[largest]) {
        largest = right
      }
    }

    if (largest === root) {
      return
    }

    yield recorder.swap(root, largest)
    root = largest
  }
}

export function* heapSort(input: number[]): Generator<SortStep> {
  const recorder = new StepRecorder(input)
  const length = input.length

  // построение кучи
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    yield* siftDown(recorder, i, length)
  }

  // перенос максимума в конец и восстановление кучи
  for (let end = length - 1; end > 0; end--) {
    yield recorder.swap(0, end)
    yield recorder.markSorted(end)
    yield* siftDown(recorder, 0, end)
  }

  yield recorder.finish()
}
