import { Button, Card } from '@sort-visualizer/ui-library'

import { ComparisonTable } from '../../components/ComparisonTable/ComparisonTable'

export function ComparePage() {
  return (
    <div className="page">
      <h1>Сравнение производительности</h1>
      <p className="hint">
        Заглушка: здесь все алгоритмы будут запускаться на одном и том же массиве,
        а результаты - выводиться в таблицу и на диаграмму.
      </p>
      <Card title="Параметры сравнения">
        <p>Размер массива и вид данных будут выбираться здесь.</p>
        <Button disabled>Запустить сравнение</Button>
      </Card>
      <ComparisonTable />
    </div>
  )
}
