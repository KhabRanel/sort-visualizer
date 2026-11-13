import { fireEvent, render, screen } from '@testing-library/react'

import { Slider } from './Slider'

describe('Slider', () => {
  test('shows label with current value', () => {
    render(<Slider label="Размер массива" max={100} min={5} onChange={jest.fn()} value={30} />)
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  test('calls onChange with a number', () => {
    const handleChange = jest.fn()

    render(<Slider label="Скорость" max={10} min={1} onChange={handleChange} value={5} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '7' } })
    expect(handleChange).toHaveBeenCalledWith(7)
  })
})
