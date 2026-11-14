import React from 'react'

import './Select.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  label: string
  value: string
  options: SelectOption[]
  disabled?: boolean
  onChange: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({ label, value, options, disabled = false, onChange }) => {
  return (
    <label className="select">
      <span className="select__label">{label}</span>
      <select
        className="select__control"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
