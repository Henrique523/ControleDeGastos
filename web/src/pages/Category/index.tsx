import React, { useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import axiosClient from '../../services/axios'
import getValidationErrors from '../../utils/getValidationErrors'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Title, FormLine } from './style'

interface CategoryFormData {
  description: string
}

const Category: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const createNewCategory = useCallback(
    async (data: CategoryFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })

        await axiosClient.post('/categories', { description: data.description })
        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          window.alert(errors.description)
        }
      }
    },
    [history]
  )

  return (
    <>
      <Header iconLeft={{ type: 'cost', way: 'cost' }} iconRight={{ type: 'goBack', way: '' }} />

      <Title>Cadastro de Categoria</Title>

      <Form ref={formRef} onSubmit={createNewCategory}>
        <FormLine>
          <Input name="description" type="text" placeholder="Descrição" />
          <Button type="submit">Cadastrar</Button>
        </FormLine>
      </Form>
    </>
  )
}

export default Category
