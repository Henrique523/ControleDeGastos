import React from 'react'
import { FiTag } from 'react-icons/fi'

import { Detailed } from './style'

interface DetailedCostData {
  data: string
  description: string
  value: string
  category: string
}

const DetailedCost: React.FC<DetailedCostData> = ({ data, description, value, category }) => {
  return (
    <Detailed>
      <div className="specific-spend-tag">
        <FiTag />
      </div>
      <div className="column-data">
        <div className="info-column-data">
          <strong className="specific-spend-strong">Data: </strong>
          <p className="specific-spend-p">{data}</p>
        </div>
        <div className="info-column-data">
          <strong className="specific-spend-strong">Descrição: </strong>
          <p className="specific-spend-p">{description}</p>
        </div>
        <div className="info-column-data">
          <strong className="specific-spend-strong">Valor: </strong>
          <p className="specific-spend-p">{value}</p>
        </div>
      </div>

      <div className="specific-spend-category">
        <strong className="specific-spend-strong">Categoria: </strong>
        <p className="specific-spend-p">{category}</p>
      </div>
    </Detailed>
  )
}

export default DetailedCost
