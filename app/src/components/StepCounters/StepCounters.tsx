import { Stat } from '@sort-visualizer/ui-library'

interface StepCountersProps {
  comparisons: number
  swaps: number
}

export function StepCounters({ comparisons, swaps }: StepCountersProps) {
  return (
    <div className="step-counters">
      <Stat label="Сравнений" value={comparisons} />
      <Stat label="Перестановок" value={swaps} />
    </div>
  )
}
