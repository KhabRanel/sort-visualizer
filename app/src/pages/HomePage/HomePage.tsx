import { Button, Card } from '@sort-visualizer/ui-library'
import { useNavigate } from 'react-router'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h1>Визуализатор алгоритмов сортировки</h1>
      <p>
        Приложение показывает пошаговую работу шести алгоритмов сортировки и позволяет
        сравнить их производительность на одинаковых данных.
      </p>
      <div className="grid">
        <Card title="Пошаговая анимация">
          <p>Выберите алгоритм и наблюдайте за сравнениями и перестановками элементов.</p>
          <Button onClick={() => navigate('/algorithms')}>К алгоритмам</Button>
        </Card>
        <Card title="Сравнение производительности">
          <p>Запустите все алгоритмы на одном массиве и сравните число операций и время.</p>
          <Button onClick={() => navigate('/compare')} variant="secondary">К сравнению</Button>
        </Card>
      </div>
    </div>
  )
}
