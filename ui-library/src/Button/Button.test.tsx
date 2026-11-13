import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Старт</Button>)
    expect(screen.getByText('Старт')).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Старт</Button>)
    fireEvent.click(screen.getByText('Старт'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn()

    render(<Button disabled onClick={handleClick}>Старт</Button>)
    fireEvent.click(screen.getByText('Старт'))
    expect(screen.getByText('Старт')).toBeDisabled()
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('applies variant and size classes', () => {
    render(<Button size="large" variant="secondary">Старт</Button>)

    const button = screen.getByText('Старт')

    expect(button).toHaveClass('btn--secondary')
    expect(button).toHaveClass('btn--large')
  })

  test('uses button type by default and accepts submit', () => {
    const { rerender } = render(<Button>Старт</Button>)

    expect(screen.getByText('Старт')).toHaveAttribute('type', 'button')
    rerender(<Button type="submit">Старт</Button>)
    expect(screen.getByText('Старт')).toHaveAttribute('type', 'submit')
  })
})
