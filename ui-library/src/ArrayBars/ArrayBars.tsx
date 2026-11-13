import React from 'react'

import './ArrayBars.css'

export type BarState = 'compare' | 'swap' | 'sorted'

export interface ArrayBarsProps {
  values: number[]
  states?: Partial<Record<number, BarState>>
  height?: number
}

export const ArrayBars: React.FC<ArrayBarsProps> = ({ values, states = {}, height = 300 }) => {
  const max = Math.max(1, ...values)

  return (
    <div className="array-bars" style={{ height }}>
      {values.map((value, index) => {
        const state = states[index]
        const className = state ? `array-bars__bar array-bars__bar--${state}` : 'array-bars__bar'

        return (
          <div
            className={className}
            data-testid="bar"
            key={index}
            style={{ height: `${(value / max) * 100}%` }}
            title={String(value)}
          />
        )
      })}
    </div>
  )
}
