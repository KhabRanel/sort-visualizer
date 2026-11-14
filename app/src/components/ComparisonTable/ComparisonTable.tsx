import { ALGORITHMS } from '../../algorithms/registry'

// Заглушка: в MVP здесь будут результаты замеров для каждого алгоритма
export function ComparisonTable() {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Алгоритм</th>
          <th>Сравнений</th>
          <th>Перестановок</th>
          <th>Время, мс</th>
        </tr>
      </thead>
      <tbody>
        {ALGORITHMS.map((algorithm) => (
          <tr key={algorithm.id}>
            <td>{algorithm.name}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
