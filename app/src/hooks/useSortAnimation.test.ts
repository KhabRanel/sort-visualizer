import { act, renderHook } from '@testing-library/react'

import { speedToDelay, useSortAnimation } from './useSortAnimation'
import { bubbleSort } from '../algorithms/bubbleSort'

const steps = Array.from(bubbleSort([3, 1, 2]))

describe('speedToDelay', () => {
  test('halves delay with each speed level', () => {
    expect(speedToDelay(1)).toBe(1000)
    expect(speedToDelay(2)).toBe(500)
    expect(speedToDelay(10)).toBe(2)
  })
})

describe('useSortAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('starts before the first step', () => {
    const { result } = renderHook(() => useSortAnimation(steps, 5))

    expect(result.current.stepIndex).toBe(-1)
    expect(result.current.currentStep).toBeNull()
    expect(result.current.isPlaying).toBe(false)
  })

  test('step moves exactly one step forward', () => {
    const { result } = renderHook(() => useSortAnimation(steps, 5))

    act(() => result.current.step())
    expect(result.current.stepIndex).toBe(0)
    expect(result.current.currentStep).toBe(steps[0])
  })

  test('play runs to the end and stops', () => {
    const { result } = renderHook(() => useSortAnimation(steps, 10))

    act(() => result.current.play())
    expect(result.current.isPlaying).toBe(true)

    for (let i = 0; i < steps.length; i++) {
      act(() => {
        jest.advanceTimersByTime(speedToDelay(10))
      })
    }

    expect(result.current.isFinished).toBe(true)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentStep).toBe(steps[steps.length - 1])
  })

  test('pause stops the timer', () => {
    const { result } = renderHook(() => useSortAnimation(steps, 1))

    act(() => result.current.play())
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    act(() => result.current.pause())
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(result.current.stepIndex).toBe(0)
    expect(result.current.isPlaying).toBe(false)
  })

  test('reset returns to the beginning', () => {
    const { result } = renderHook(() => useSortAnimation(steps, 5))

    act(() => result.current.step())
    act(() => result.current.reset())
    expect(result.current.stepIndex).toBe(-1)
  })

  test('play and step do nothing when finished', () => {
    const { result } = renderHook(() => useSortAnimation(steps, 5))

    for (let i = 0; i < steps.length; i++) {
      act(() => result.current.step())
    }

    act(() => result.current.step())
    act(() => result.current.play())
    expect(result.current.stepIndex).toBe(steps.length - 1)
    expect(result.current.isPlaying).toBe(false)
  })
})
