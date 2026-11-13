import React from 'react'

import './Slider.css'

export interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  disabled?: boolean
  onChange: (value: number) => void
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, disabled = false, onChange }) => {
  return (
    <label className="slider">
      <span className="slider__label">
        {label}: <strong>{value}</strong>
      </span>
      <input
        className="slider__control"
        disabled={disabled}
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  )
}
