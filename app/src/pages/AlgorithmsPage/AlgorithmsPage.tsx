import { Card } from '@sort-visualizer/ui-library'
import { Link } from 'react-router'

import { ALGORITHMS } from '../../algorithms/registry'

export function AlgorithmsPage() {
  return (
    <div className="page">
      <h1>Алгоритмы</h1>
      <p>Выберите алгоритм, чтобы открыть его пошаговую визуализацию.</p>
      <div className="grid">
        {ALGORITHMS.map((algorithm) => (
          <Card key={algorithm.id} title={algorithm.name}>
            <p>
              Средний случай: {algorithm.average}, худший: {algorithm.worst}, память: {algorithm.memory}
            </p>
            <Link to={`/algorithms/${algorithm.id}`}>Открыть визуализацию →</Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
