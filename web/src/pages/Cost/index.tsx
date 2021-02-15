import React, { useRef, useState, useCallback, useMemo } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Select from '../../components/Select'

import { Title, FormLine } from './style'

interface CostFormData {
  category_id: string
  value: number
  description: string
  date: Date
}

const options = [
  { value: 'chocolate', label: 'Compras' },
  { value: 'strawberry', label: 'Carro' },
  { value: 'vanilla', label: 'Lazer' },
]

const Cost: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [date, setDate] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const dateInputType = useMemo(() => {
    if ((!isFocused && isFilled) || isFocused) {
      return 'date'
    }

    return 'text'
  }, [isFilled, isFocused])

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

  const handleForm = useCallback((data: CostFormData) => {
    console.log(data)
  }, [])

  return (
    <>
      <Header iconLeft={{ type: 'category', way: 'category' }} iconRight={{ type: 'goBack', way: '' }} />

      <Title>Cadastro de Gasto</Title>

      <Form ref={formRef} onSubmit={handleForm}>
        <FormLine>
          <div className="cost-form">
            <Input name="description" type="text" placeholder="Descrição" />
            <Input name="value" type="number" placeholder="Valor" />

            <Input
              name="date"
              placeholder="Data"
              onChange={updateDateValue}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              type={dateInputType}
            />

            <Select name="category_id" options={options} />
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
