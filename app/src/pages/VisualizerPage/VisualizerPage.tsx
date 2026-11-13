import { useState } from 'react'

import { ArrayBars, Card } from '@sort-visualizer/ui-library'
import { Link, useParams } from 'react-router'

import { findAlgorithm } from '../../algorithms/registry'
import { ControlPanel } from '../../components/ControlPanel/ControlPanel'
import { StepCounters } from '../../components/StepCounters/StepCounters'
import { generateArray } from '../../utils/generateArray'

import type { DataType } from '../../utils/generateArray'

export function VisualizerPage() {
  const { algorithmId } = useParams()
  const algorithm = findAlgorithm(algorithmId)
  const [dataType, setDataType] = useState<DataType>('random')
  const [size, setSize] = useState<number>(30)
  const [speed, setSpeed] = useState<number>(5)
  const [array, setArray] = useState<number[]>(() => generateArray(30, 'random'))

  if (!algorithm) {
    return (
      <div className="page">
        <h1>Алгоритм не найден</h1>
        <p>Алгоритма с идентификатором «{algorithmId}» нет.</p>
        <Link to="/algorithms">Вернуться к списку алгоритмов</Link>
      </div>
    )
  }

  const changeDataType = (newType: DataType) => {
    setDataType(newType)
    setArray(generateArray(size, newType))
  }

  const changeSize = (newSize: number) => {
    setSize(newSize)
    setArray(generateArray(newSize, dataType))
  }

  return (
    <div className="page">
      <h1>{algorithm.name}</h1>
      <p className="hint">
        Заглушка: сейчас показан исходный массив. Пошаговая анимация с подсветкой
        сравнений и перестановок будет реализована в MVP.
      </p>
      <ArrayBars values={array} />
      <ControlPanel
        dataType={dataType}
        onDataTypeChange={changeDataType}
        onNewArray={() => setArray(generateArray(size, dataType))}
        onSizeChange={changeSize}
        onSpeedChange={setSpeed}
        size={size}
        speed={speed}
      />
      <StepCounters comparisons={0} swaps={0} />
      <Card title="Сложность">
        <p>
          Лучший случай: {algorithm.best}; средний: {algorithm.average}; худший: {algorithm.worst};
          память: {algorithm.memory}; устойчивость: {algorithm.stable ? 'да' : 'нет'}
        </p>
      </Card>
    </div>
  )
}
