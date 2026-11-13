export type DataType = 'random' | 'sorted' | 'reversed' | 'nearlySorted'

export const DATA_TYPE_OPTIONS: { value: DataType, label: string }[] = [
  { value: 'random', label: 'Случайный' },
  { value: 'sorted', label: 'Отсортированный' },
  { value: 'reversed', label: 'Обратно отсортированный' },
  { value: 'nearlySorted', label: 'Почти отсортированный' },
]

// random передаётся параметром, чтобы функцию можно было протестировать
export function generateArray(size: number, type: DataType, random: () => number = Math.random): number[] {
  const sorted = Array.from({ length: size }, (_, index) => index + 1)

  if (type === 'sorted') {
    return sorted
  }

  if (type === 'reversed') {
    return sorted.reverse()
  }

  if (type === 'nearlySorted') {
    // меняем местами примерно 5% соседних пар
    const swaps = Math.max(1, Math.floor(size / 20))

    for (let i = 0; i < swaps; i++) {
      const index = Math.floor(random() * (size - 1))
      const temp = sorted[index]

      sorted[index] = sorted[index + 1]
      sorted[index + 1] = temp
    }

    return sorted
  }

  return Array.from({ length: size }, () => Math.floor(random() * size) + 1)
}
