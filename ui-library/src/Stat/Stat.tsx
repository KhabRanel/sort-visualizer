import React from 'react'

import './Stat.css'

export interface StatProps {
  label: string
  value: number | string
}

export const Stat: React.FC<StatProps> = ({ label, value }) => {
  return (
    <div className="stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  )
}
