import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Title, FormLine } from './style'

const Category: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  return (
    <>
      <Header iconLeft={{ type: 'cost', way: 'cost' }} iconRight={{ type: 'goBack', way: '' }} />

      <Title>Cadastro de Categoria</Title>

      <Form ref={formRef}>
        <FormLine>
          <Input name="description" type="text" placeholder="Descrição" />
          <Button type="submit">Cadastrar</Button>
        </FormLine>
      </Form>
    </>
  )
}

export default Category
