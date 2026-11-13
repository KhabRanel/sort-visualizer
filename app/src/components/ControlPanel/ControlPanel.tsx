import { Button, Select, Slider } from '@sort-visualizer/ui-library'

import { DATA_TYPE_OPTIONS } from '../../utils/generateArray'

import type { DataType } from '../../utils/generateArray'

interface ControlPanelProps {
  dataType: DataType
  size: number
  speed: number
  onDataTypeChange: (dataType: DataType) => void
  onSizeChange: (size: number) => void
  onSpeedChange: (speed: number) => void
  onNewArray: () => void
}

// Кнопки управления анимацией пока заглушки: анимация появится в MVP
export function ControlPanel(props: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-panel__buttons">
        <Button disabled>Старт</Button>
        <Button disabled variant="secondary">Пауза</Button>
        <Button disabled variant="secondary">Шаг</Button>
        <Button disabled variant="secondary">Сброс</Button>
        <Button onClick={props.onNewArray} variant="secondary">Новый массив</Button>
      </div>
      <div className="control-panel__settings">
        <Select
          label="Вид данных"
          onChange={(value) => props.onDataTypeChange(value as DataType)}
          options={DATA_TYPE_OPTIONS}
          value={props.dataType}
        />
        <Slider label="Размер массива" max={100} min={5} onChange={props.onSizeChange} value={props.size} />
        <Slider label="Скорость" max={10} min={1} onChange={props.onSpeedChange} value={props.speed} />
      </div>
    </div>
  )
}
