import React from 'react'
import { FiCalendar, FiTag } from 'react-icons/fi'

import { Resumed } from './style'

interface IconSelected {
  type: 'calendar' | 'tag'
  dateOrCategory: string
  value: string
}

const icons = {
  calendar: <FiCalendar />,
  tag: <FiTag />,
}

const ResumedCost: React.FC<IconSelected> = ({ type, dateOrCategory, value }) => {
  return (
    <Resumed>
      <div className="icon-and-date-or-category-and-value-resumed-cost">
        <div className="icon-circle-resumed-cost">{icons[type]}</div>
        <div className="strong-category-or-date-resumed-cost">{dateOrCategory}</div>
      </div>

      <div className="icon-and-date-or-category-and-value-resumed-cost">
        <div className="value-description-resumed-cost">Valor:</div>
        <p>{value}</p>
      </div>
    </Resumed>
  )
}

export default ResumedCost
