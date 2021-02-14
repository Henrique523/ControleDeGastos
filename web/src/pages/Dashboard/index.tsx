import React, { useRef, useCallback, useState, useMemo } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import Header from '../../components/Header'
import ResumedCost from '../../components/ResumedCost'
import DetailedCost from '../../components/DetailedCost'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Content, CardFutureSpends, DashboardCards, ResumedSpends, DetailedSpends } from './styles'

interface SeacrhByRangeFormData {
  initialDate: string
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [initialDateValue, setInitialDateValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const initialDateInputType = useMemo(() => {
    if ((!isFocused && isFilled) || isFocused) {
      return 'date'
    }

    return 'text'
  }, [isFilled, isFocused])

  const handleSearchByRange = useCallback((data: SeacrhByRangeFormData) => {
    console.log(data, 'DATA')
  }, [])

  const updateInitialDateValue = useCallback((data: React.ChangeEvent<HTMLInputElement>) => {
    setInitialDateValue(data.target.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!initialDateValue)
  }, [initialDateValue])

  return (
    <>
      <Header iconLeft={{ type: 'cost', way: 'cost' }} iconRight={{ type: 'category', way: 'category' }} />

      <Content>
        <Form ref={formRef} onSubmit={handleSearchByRange}>
          <Input
            name="initialDate"
            placeholder="Data Inicial"
            onChange={updateInitialDateValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            type={initialDateInputType}
          />
          <Button type="submit">Filtrar</Button>
        </Form>

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
