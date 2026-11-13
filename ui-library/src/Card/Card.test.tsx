import { render, screen } from '@testing-library/react'

import { Card } from './Card'

describe('Card', () => {
  test('renders title and content', () => {
    render(<Card title="Сортировка пузырьком">Описание</Card>)
    expect(screen.getByRole('heading', { name: 'Сортировка пузырьком' })).toBeInTheDocument()
    expect(screen.getByText('Описание')).toBeInTheDocument()
  })

  test('renders without title', () => {
    render(<Card>Только содержимое</Card>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  test('adds custom class name', () => {
    const { container } = render(<Card className="extra">Текст</Card>)

    expect(container.firstChild).toHaveClass('card')
    expect(container.firstChild).toHaveClass('extra')
  })
})
