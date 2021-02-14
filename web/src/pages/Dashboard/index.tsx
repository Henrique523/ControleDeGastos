import React, { useState, useCallback } from 'react'

import Header from '../../components/Header'
import ResumedCost from '../../components/ResumedCost'
import DetailedCost from '../../components/DetailedCost'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Content, CardFutureSpends, DashboardCards, ResumedSpends, DetailedSpends } from './styles'

const Dashboard: React.FC = () => {
  const [inputType, setInputType] = useState('text')

  const changeTypeInput = useCallback(() => {
    inputType === 'text' ? setInputType('date') : setInputType('text')
  }, [inputType])

  return (
    <>
      <Header iconLeft={{ type: 'cost', way: 'cost' }} iconRight={{ type: 'category', way: 'category' }} />

      <Content>
        <form>
          <Input type={inputType} placeholder="Data Inicial" onFocus={changeTypeInput} />
          <Button type="submit">Filtrar</Button>
        </form>

        <DashboardCards>
          <ResumedSpends>
            <CardFutureSpends>
              <h3>Previsão Gastos Futuros</h3>

              <ResumedCost dateOrCategory="Janeiro/2021" type="calendar" value="R$ 1.500,00" />
              <ResumedCost dateOrCategory="Fevereiro/2021" type="calendar" value="R$ 1.500,00" />
              <ResumedCost dateOrCategory="Março/2021" type="calendar" value="R$ 1.500,00" />
              <ResumedCost dateOrCategory="Abril/2021" type="calendar" value="R$ 1.500,00" />
            </CardFutureSpends>

            <CardFutureSpends>
              <h3>Gastos Por Categoria</h3>

              <ResumedCost dateOrCategory="Compras" type="tag" value="R$ 3.000,00" />
              <ResumedCost dateOrCategory="Cinema" type="tag" value="R$ 250,00" />
              <ResumedCost dateOrCategory="Combustível" type="tag" value="R$ 280,00" />
            </CardFutureSpends>
          </ResumedSpends>

          <DetailedSpends>
            <h3>Gastos Detalhados</h3>

            <DetailedCost data="12/02/2021" description="Tatico" value="R$ 1.527,97" category="Compras" />
          </DetailedSpends>
        </DashboardCards>
      </Content>
    </>
  )
}

export default Dashboard
