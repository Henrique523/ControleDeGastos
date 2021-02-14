import React from 'react'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Title, Form } from './style'

const Cost: React.FC = () => {
  return (
    <>
      <Header iconLeft={{ type: 'category', way: 'category' }} iconRight={{ type: 'goBack', way: '' }} />

      <Title>Cadastro de Gasto</Title>

      <Form>
        <div className="cost-form">
          <Input type="text" placeholder="Descrição" />

          <Input type="number" placeholder="Valor" />
          <Input type="date" placeholder="Data" />

          <select>
            <option value="" disabled selected hidden>
              Categoria
            </option>
            <option value="Compras">Compras</option>
          </select>
        </div>

        <div className="register-form-button">
          <Button type="submit">Cadastrar</Button>
        </div>
      </Form>
    </>
  )
}

export default Cost
