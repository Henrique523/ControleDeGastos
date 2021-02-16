import React, { useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import axiosClient from '../../utils/axios'

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
    async ({ description }: CategoryFormData) => {
      try {
        await axiosClient.post('/categories', { description })
        history.push('/')
      } catch (err) {
        window.alert(err)
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
