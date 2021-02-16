import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { parseISO } from 'date-fns'

import axiosClient from '../../utils/axios'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Select from '../../components/Select'

import { Title, FormLine } from './style'

interface CostFormData {
  category_id: string
  value: number
  description: string
  date: string
}

interface CategoryOptions {
  value: string
  label: string
}

interface CategoryResponseData {
  description: string
  id: string
}
const Cost: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const [date, setDate] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState<CategoryOptions[]>([])

  const dateInputType = useMemo(() => {
    if ((!isFocused && isFilled) || isFocused) {
      return 'date'
    }

    return 'text'
  }, [isFilled, isFocused])

  const getCategories = useCallback(async () => {
    try {
      const response = await axiosClient.get<CategoryResponseData[]>('/categories')
      return response.data
    } catch (err) {
      window.alert(err)
    }
  }, [])

  useEffect(() => {
    getCategories().then(categories => {
      if (categories) {
        const categoriesFromSelect: CategoryOptions[] = categories.map(category => ({
          label: category.description,
          value: category.id,
        }))

        setCategoryOptions(categoriesFromSelect)
      }
    })
  }, [getCategories])

  const updateDateValue = useCallback((data: React.ChangeEvent<HTMLInputElement>) => {
    setDate(data.target.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!date)
  }, [date])

  const createNewCost = useCallback(
    async ({ category_id, date, description, value }: CostFormData) => {
      const dateFormatted = parseISO(date)

      try {
        await axiosClient.post('/costs', { category_id, description, value, date: dateFormatted })
        history.push('/')
      } catch (err) {
        window.alert(err)
      }
    },
    [history]
  )

  return (
    <>
      <Header iconLeft={{ type: 'category', way: 'category' }} iconRight={{ type: 'goBack', way: '' }} />

      <Title>Cadastro de Gasto</Title>

      <Form ref={formRef} onSubmit={createNewCost}>
        <FormLine>
          <div className="cost-form">
            <Input name="description" type="text" placeholder="Descrição" />
            <Input name="value" type="number" step=".01" placeholder="Valor" />

            <Input
              name="date"
              placeholder="Data"
              onChange={updateDateValue}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              type={dateInputType}
            />

            <Select name="category_id" options={categoryOptions} placeholder="Categoria" />
          </div>

          <div className="register-form-button">
            <Button type="submit">Cadastrar</Button>
          </div>
        </FormLine>
      </Form>
    </>
  )
}

export default Cost
