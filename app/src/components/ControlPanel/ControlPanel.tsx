import { Button, Select, Slider } from '@sort-visualizer/ui-library'

import { DATA_TYPE_OPTIONS } from '../../utils/generateArray'

import type { DataType } from '../../utils/generateArray'

export interface ControlPanelProps {
  dataType: DataType
  size: number
  speed: number
  isPlaying: boolean
  isFinished: boolean
  isStarted: boolean
  onStart: () => void
  onPause: () => void
  onStep: () => void
  onReset: () => void
  onNewArray: () => void
  onDataTypeChange: (dataType: DataType) => void
  onSizeChange: (size: number) => void
  onSpeedChange: (speed: number) => void
}

export function ControlPanel(props: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-panel__buttons">
        <Button disabled={props.isPlaying || props.isFinished} onClick={props.onStart}>Старт</Button>
        <Button disabled={!props.isPlaying} onClick={props.onPause} variant="secondary">Пауза</Button>
        <Button disabled={props.isPlaying || props.isFinished} onClick={props.onStep} variant="secondary">Шаг</Button>
        <Button disabled={!props.isStarted} onClick={props.onReset} variant="secondary">Сброс</Button>
        <Button disabled={props.isPlaying} onClick={props.onNewArray} variant="secondary">Новый массив</Button>
      </div>
      <div className="control-panel__settings">
        <Select
          disabled={props.isPlaying}
          label="Вид данных"
          onChange={(value) => props.onDataTypeChange(value as DataType)}
          options={DATA_TYPE_OPTIONS}
          value={props.dataType}
        />
        <Slider
          disabled={props.isPlaying}
          label="Размер массива"
          max={100}
          min={5}
          onChange={props.onSizeChange}
          value={props.size}
        />
        <Slider label="Скорость" max={10} min={1} onChange={props.onSpeedChange} value={props.speed} />
      </div>
    </div>
  )
}
