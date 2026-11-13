import { render, screen } from '@testing-library/react'

import { ArrayBars } from './ArrayBars'

describe('ArrayBars', () => {
  test('renders one bar per value with relative height', () => {
    render(<ArrayBars values={[5, 10]} />)

    const bars = screen.getAllByTestId('bar')

    expect(bars).toHaveLength(2)
    expect(bars[0]).toHaveStyle({ height: '50%' })
    expect(bars[1]).toHaveStyle({ height: '100%' })
  })

  test('highlights bars by state', () => {
    render(<ArrayBars states={{ 0: 'compare', 2: 'sorted' }} values={[3, 1, 2]} />)

    const bars = screen.getAllByTestId('bar')

    expect(bars[0]).toHaveClass('array-bars__bar--compare')
    expect(bars[1]).not.toHaveClass('array-bars__bar--compare')
    expect(bars[2]).toHaveClass('array-bars__bar--sorted')
  })

  test('renders empty array without errors', () => {
    render(<ArrayBars values={[]} />)
    expect(screen.queryAllByTestId('bar')).toHaveLength(0)
  })
})
