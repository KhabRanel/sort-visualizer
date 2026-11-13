import { fireEvent, render, screen } from '@testing-library/react'

import { Select } from './Select'

const options = [
  { value: 'random', label: 'Случайный' },
  { value: 'sorted', label: 'Отсортированный' },
]

describe('Select', () => {
  test('renders label and options', () => {
    render(<Select label="Вид данных" onChange={jest.fn()} options={options} value="random" />)
    expect(screen.getByText('Вид данных')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })

  test('calls onChange with selected value', () => {
    const handleChange = jest.fn()

    render(<Select label="Вид данных" onChange={handleChange} options={options} value="random" />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'sorted' } })
    expect(handleChange).toHaveBeenCalledWith('sorted')
  })
})
