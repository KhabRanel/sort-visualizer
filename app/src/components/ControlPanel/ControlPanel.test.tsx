import { fireEvent, render, screen } from '@testing-library/react'

import { ControlPanel } from './ControlPanel'

import type { ControlPanelProps } from './ControlPanel'

function renderPanel(overrides: Partial<ControlPanelProps> = {}) {
  const props: ControlPanelProps = {
    dataType: 'random',
    size: 30,
    speed: 5,
    isPlaying: false,
    isFinished: false,
    isStarted: false,
    onStart: jest.fn(),
    onPause: jest.fn(),
    onStep: jest.fn(),
    onReset: jest.fn(),
    onNewArray: jest.fn(),
    onDataTypeChange: jest.fn(),
    onSizeChange: jest.fn(),
    onSpeedChange: jest.fn(),
    ...overrides,
  }

  render(<ControlPanel {...props} />)

  return props
}

describe('ControlPanel', () => {
  test('before start: start and step are enabled, pause and reset disabled', () => {
    renderPanel()
    expect(screen.getByText('Старт')).toBeEnabled()
    expect(screen.getByText('Шаг')).toBeEnabled()
    expect(screen.getByText('Пауза')).toBeDisabled()
    expect(screen.getByText('Сброс')).toBeDisabled()
  })

  test('while playing: only pause, reset and speed are available', () => {
    renderPanel({ isPlaying: true, isStarted: true })
    expect(screen.getByText('Старт')).toBeDisabled()
    expect(screen.getByText('Шаг')).toBeDisabled()
    expect(screen.getByText('Новый массив')).toBeDisabled()
    expect(screen.getByText('Пауза')).toBeEnabled()
    expect(screen.getByText('Сброс')).toBeEnabled()
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  test('when finished: start is disabled until reset', () => {
    renderPanel({ isFinished: true, isStarted: true })
    expect(screen.getByText('Старт')).toBeDisabled()
    expect(screen.getByText('Сброс')).toBeEnabled()
  })

  test('buttons call handlers', () => {
    const props = renderPanel({ isStarted: true })

    fireEvent.click(screen.getByText('Старт'))
    fireEvent.click(screen.getByText('Шаг'))
    fireEvent.click(screen.getByText('Сброс'))
    fireEvent.click(screen.getByText('Новый массив'))
    expect(props.onStart).toHaveBeenCalled()
    expect(props.onStep).toHaveBeenCalled()
    expect(props.onReset).toHaveBeenCalled()
    expect(props.onNewArray).toHaveBeenCalled()
  })

  test('pause button calls handler while playing', () => {
    const props = renderPanel({ isPlaying: true, isStarted: true })

    fireEvent.click(screen.getByText('Пауза'))
    expect(props.onPause).toHaveBeenCalled()
  })

  test('settings call handlers with new values', () => {
    const props = renderPanel()
    const [sizeSlider, speedSlider] = screen.getAllByRole('slider')

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'reversed' } })
    fireEvent.change(sizeSlider, { target: { value: '50' } })
    fireEvent.change(speedSlider, { target: { value: '8' } })
    expect(props.onDataTypeChange).toHaveBeenCalledWith('reversed')
    expect(props.onSizeChange).toHaveBeenCalledWith(50)
    expect(props.onSpeedChange).toHaveBeenCalledWith(8)
  })
})
