import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { getMonth, getYear, format, parseISO } from 'date-fns'
import ptbrLocale from 'date-fns/locale/pt-BR'
import * as Yup from 'yup'

import axiosClient from '../../services/axios'
import getValidationErrors from '../../utils/getValidationErrors'

import Header from '../../components/Header'
import ResumedCost from '../../components/ResumedCost'
import DetailedCost from '../../components/DetailedCost'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Content, CardFutureSpends, DashboardCards, ResumedSpends, DetailedSpends } from './styles'

interface SeacrhByRangeFormData {
  initialDate: string
}

interface CategoryResumedData {
  category: string
  value: number
}

interface MonthResumedData {
  month: string
  value: number
}

interface CategoryResponseData {
  description: string
  id: string
}

interface CostByCategoryResponseData {
  value: string
}

interface CostByMonthResponseData {
  day: number
  costs: CostByCategoryResponseData[]
}

interface MostRecentCosts {
  id: string
  date: Date
  date_string: string
  description: string
  value: number
  category: string
  category_id: string
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [initialDateValue, setInitialDateValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [categories, setCategories] = useState<CategoryResponseData[]>([])
  const [totalByCategory, setTotalByCategory] = useState<CategoryResumedData[]>([])
  const [totalByMonth, setTotalByMonth] = useState<MonthResumedData[]>([])
  const [mostRecentCosts, setMostRecentCosts] = useState<MostRecentCosts[]>([])

  const initialDateInputType = useMemo(() => {
    if ((!isFocused && isFilled) || isFocused) {
      return 'date'
    }

    return 'text'
  }, [isFilled, isFocused])

  useEffect(() => {
    axiosClient.get<CategoryResponseData[]>('/categories').then(categories => {
      setCategories(categories.data)
    })
  }, [])

  const searchNextCosts = useCallback(async () => {
    const thisYear = getYear(new Date(Date.now()))
    const thisMonth = getMonth(new Date(Date.now()))
    const totalValueMonths = [0, 0, 0, 0]

    const dates = [
      new Date(thisYear, thisMonth + 1),
      new Date(thisYear, thisMonth + 2),
      new Date(thisYear, thisMonth + 3),
      new Date(thisYear, thisMonth + 4),
    ]

    const datesFormatted = [
      format(dates[0], 'MMMM', { locale: ptbrLocale }),
      format(dates[1], 'MMMM', { locale: ptbrLocale }),
      format(dates[2], 'MMMM', { locale: ptbrLocale }),
      format(dates[3], 'MMMM', { locale: ptbrLocale }),
    ]

    const monthFormattedIndex = totalByMonth.findIndex(month =>
      datesFormatted.findIndex(dateFormatted => dateFormatted === month.month)
    )

    if (monthFormattedIndex === -1) {
      const [responseByMonthOne, responseByMonthTwo, responseByMonthThree, responseByMonthFour] = await Promise.all([
        axiosClient.get<CostByMonthResponseData[]>(
          `/costs/by-month/month/${getMonth(dates[0])}/year/${getYear(dates[0])}`
        ),
        axiosClient.get<CostByMonthResponseData[]>(
          `/costs/by-month/month/${getMonth(dates[1])}/year/${getYear(dates[1])}`
        ),
        axiosClient.get<CostByMonthResponseData[]>(
          `/costs/by-month/month/${getMonth(dates[2])}/year/${getYear(dates[2])}`
        ),
        axiosClient.get<CostByMonthResponseData[]>(
          `/costs/by-month/month/${getMonth(dates[3])}/year/${getYear(dates[3])}`
        ),
      ])

      responseByMonthOne.data.forEach(response => {
        response.costs.forEach(costThisDay => {
          totalValueMonths[0] += Number(costThisDay.value)
        })
      })

      responseByMonthTwo.data.forEach(response => {
        response.costs.forEach(costThisDay => {
          totalValueMonths[1] += Number(costThisDay.value)
        })
      })

      responseByMonthThree.data.forEach(response => {
        response.costs.forEach(costThisDay => {
          totalValueMonths[2] += Number(costThisDay.value)
        })
      })

      responseByMonthFour.data.forEach(response => {
        response.costs.forEach(costThisDay => {
          totalValueMonths[3] += Number(costThisDay.value)
        })
      })

      setTotalByMonth([
        { month: `${datesFormatted[0]}/${dates[0].getFullYear()}`, value: Number(totalValueMonths[0].toFixed(2)) },
        { month: `${datesFormatted[1]}/${dates[1].getFullYear()}`, value: Number(totalValueMonths[1].toFixed(2)) },
        { month: `${datesFormatted[2]}/${dates[2].getFullYear()}`, value: Number(totalValueMonths[2].toFixed(2)) },
        { month: `${datesFormatted[3]}/${dates[3].getFullYear()}`, value: Number(totalValueMonths[3].toFixed(2)) },
      ])
    }
  }, [totalByMonth])

  useEffect(() => {
    searchNextCosts()
  }, [searchNextCosts])

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

  const handleSearchByRange = useCallback(
    async (data: SeacrhByRangeFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          initialDate: Yup.string().required('Data inicial obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })

        const finalDate = new Date(Date.now())
        finalDate.setHours(23)
        finalDate.setMinutes(59)
        finalDate.setSeconds(59)

        const response = await axiosClient.post<MostRecentCosts[]>('/costs/by-range', {
          initialDate: parseISO(data.initialDate),
          finalDate,
        })
        const mostRecentCosts = response.data.map(cost => {
          const categoryIndex = categories.findIndex(category => category.id === cost.category_id)
          const date_string = `${cost.date}`.split('T')[0].split('-').reverse().join('/')
          return {
            ...cost,
            category: categories[categoryIndex].description,
            date_string,
          }
        })

        setMostRecentCosts(mostRecentCosts)

        const recentCostsOrderedByCategory: Array<MostRecentCosts[]> = []
        const totalByCategoryFiltered: CategoryResumedData[] = []

        categories.forEach((category, index) => {
          recentCostsOrderedByCategory[index] = mostRecentCosts.filter(
            recentCost => recentCost.category_id === category.id
          )
        })

        recentCostsOrderedByCategory.forEach(costsByCategory => {
          if (costsByCategory.length > 0) {
            const indexTotalByCategory = totalByCategory.findIndex(
              total => total.category === costsByCategory[0].description
            )

            if (indexTotalByCategory === -1) {
              let totalValue = 0

              costsByCategory.forEach(cost => {
                totalValue += Number(cost.value)
              })

              totalByCategoryFiltered.push({
                category: costsByCategory[0].category,
                value: Number(totalValue.toFixed(2)),
              })
            }
          }
        })

        setTotalByCategory(totalByCategoryFiltered)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          window.alert(errors.initialDate)
        }
      }
    },
    [categories, totalByCategory]
  )

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

              {totalByMonth.map(cost => (
                <ResumedCost key={cost.month} dateOrCategory={cost.month} type="calendar" value={`R$ ${cost.value}`} />
              ))}
            </CardFutureSpends>

            <CardFutureSpends>
              <h3>Gastos Por Categoria</h3>

              {totalByCategory.map(costByCategory => (
                <ResumedCost
                  key={costByCategory.category}
                  dateOrCategory={costByCategory.category}
                  type="tag"
                  value={`R$ ${String(costByCategory.value)}`}
                />
              ))}
            </CardFutureSpends>
          </ResumedSpends>

          <DetailedSpends>
            <h3>Gastos Detalhados</h3>

            {mostRecentCosts.map(recentCost => (
              <DetailedCost
                key={recentCost.id}
                data={recentCost.date_string}
                description={recentCost.description}
                value={`R$ ${recentCost.value}`}
                category={recentCost.category}
              />
            ))}
          </DetailedSpends>
        </DashboardCards>
      </Content>
    </>
  )
}

export default Dashboard
