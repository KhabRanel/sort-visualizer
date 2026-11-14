import { useEffect, useState } from 'react'

import type { SortStep } from '../algorithms/types'

// Задержка между шагами: скорость 1 - 1000 мс, каждая следующая быстрее в 2 раза
export function speedToDelay(speed: number): number {
  return Math.round(1000 / 2 ** (speed - 1))
}

export interface SortAnimation {
  // номер текущего шага, -1 - анимация ещё не начата
  stepIndex: number
  currentStep: SortStep | null
  isPlaying: boolean
  isFinished: boolean
  play: () => void
  pause: () => void
  step: () => void
  reset: () => void
}

// Проигрыватель: по таймеру переходит к следующему шагу из готового списка шагов
export function useSortAnimation(steps: SortStep[], speed: number): SortAnimation {
  const [stepIndex, setStepIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const lastIndex = steps.length - 1
  const isFinished = stepIndex >= lastIndex

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const timer = setTimeout(() => {
      const next = stepIndex + 1

      setStepIndex(next)

      if (next >= lastIndex) {
        setIsPlaying(false)
      }
    }, speedToDelay(speed))

    return () => clearTimeout(timer)
  }, [isPlaying, stepIndex, lastIndex, speed])

  const play = () => {
    if (!isFinished) {
      setIsPlaying(true)
    }
  }

  const pause = () => setIsPlaying(false)

  const step = () => {
    if (!isFinished) {
      setIsPlaying(false)
      setStepIndex(stepIndex + 1)
    }
  }

  const reset = () => {
    setIsPlaying(false)
    setStepIndex(-1)
  }

  return {
    stepIndex,
    currentStep: stepIndex >= 0 ? steps[stepIndex] : null,
    isPlaying,
    isFinished,
    play,
    pause,
    step,
    reset,
  }
}
