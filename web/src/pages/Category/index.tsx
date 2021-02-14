import React from 'react'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Title, Form } from './style'

const Category: React.FC = () => {
  return (
    <>
      <Header iconLeft={{ type: 'cost', way: 'cost' }} iconRight={{ type: 'goBack', way: '' }} />

      <Title>Cadastro de Categoria</Title>

      <Form>
        <Input type="text" placeholder="Descrição" />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  )
}

export default Category
