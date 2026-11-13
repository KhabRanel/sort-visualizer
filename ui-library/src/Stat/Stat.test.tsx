import { render, screen } from '@testing-library/react'

import { Stat } from './Stat'

describe('Stat', () => {
  test('renders label and value', () => {
    render(<Stat label="Сравнений" value={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('Сравнений')).toBeInTheDocument()
  })
})
