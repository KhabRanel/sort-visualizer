import { useMemo, useState } from 'react'

import { ArrayBars, Card } from '@sort-visualizer/ui-library'
import { Link, useParams } from 'react-router'

import { findAlgorithm } from '../../algorithms/registry'
import { ControlPanel } from '../../components/ControlPanel/ControlPanel'
import { StepCounters } from '../../components/StepCounters/StepCounters'
import { useSortAnimation } from '../../hooks/useSortAnimation'
import { getBarStates } from '../../utils/barStates'
import { generateArray } from '../../utils/generateArray'

import type { SortStep } from '../../algorithms/types'
import type { DataType } from '../../utils/generateArray'

export function VisualizerPage() {
  const { algorithmId } = useParams()
  const algorithm = findAlgorithm(algorithmId)
  const [dataType, setDataType] = useState<DataType>('random')
  const [size, setSize] = useState<number>(30)
  const [speed, setSpeed] = useState<number>(5)
  const [initialArray, setInitialArray] = useState<number[]>(() => generateArray(30, 'random'))

  // все шаги сортировки вычисляются заранее, анимация только переключает их
  const steps = useMemo<SortStep[]>(
    () => (algorithm ? Array.from(algorithm.sort(initialArray)) : []),
    [algorithm, initialArray],
  )
  const animation = useSortAnimation(steps, speed)

  if (!algorithm) {
    return (
      <div className="page">
        <h1>Алгоритм не найден</h1>
        <p>Алгоритма с идентификатором «{algorithmId}» нет.</p>
        <Link to="/algorithms">Вернуться к списку алгоритмов</Link>
      </div>
    )
  }

  const changeArray = (newSize: number, newType: DataType) => {
    animation.reset()
    setInitialArray(generateArray(newSize, newType))
  }

  const changeDataType = (newType: DataType) => {
    setDataType(newType)
    changeArray(size, newType)
  }

  const changeSize = (newSize: number) => {
    setSize(newSize)
    changeArray(newSize, dataType)
  }

  const step = animation.currentStep

  return (
    <div className="page">
      <h1>{algorithm.name}</h1>
      <ArrayBars states={getBarStates(step)} values={step ? step.array : initialArray} />
      <div className="legend">
        <span className="legend__item legend__item--compare">сравнение</span>
        <span className="legend__item legend__item--swap">перестановка</span>
        <span className="legend__item legend__item--sorted">на своём месте</span>
      </div>
      <ControlPanel
        dataType={dataType}
        isFinished={animation.isFinished}
        isPlaying={animation.isPlaying}
        isStarted={animation.stepIndex >= 0}
        onDataTypeChange={changeDataType}
        onNewArray={() => changeArray(size, dataType)}
        onPause={animation.pause}
        onReset={animation.reset}
        onSizeChange={changeSize}
        onSpeedChange={setSpeed}
        onStart={animation.play}
        onStep={animation.step}
        size={size}
        speed={speed}
      />
      <StepCounters comparisons={step ? step.comparisons : 0} swaps={step ? step.swaps : 0} />
      <p className="status">
        {animation.isFinished
          ? 'Массив отсортирован. Нажмите «Сброс», чтобы посмотреть ещё раз.'
          : `Шаг ${animation.stepIndex + 1} из ${steps.length}`}
      </p>
      <Card title="Сложность">
        <p>
          Лучший случай: {algorithm.best}; средний: {algorithm.average}; худший: {algorithm.worst};
          память: {algorithm.memory}; устойчивость: {algorithm.stable ? 'да' : 'нет'}
        </p>
      </Card>
    </div>
  )
}
