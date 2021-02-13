import React from 'react'
import { FiChevronLeft, FiBook, FiTag } from 'react-icons/fi'

import { HeaderComponent, ButtonIcon } from './style'

interface HeaderProps {
  iconLeft: 'goBack' | 'cost' | 'category'
  iconRight: 'goBack' | 'cost' | 'category'
}

const icons = {
  goBack: <FiChevronLeft color="#fbfbfb" />,
  cost: <FiBook color="#fbfbfb" />,
  category: <FiTag color="#fbfbfb" />,
}

const Header: React.FC<HeaderProps> = ({ iconLeft, iconRight }) => {
  return (
    <HeaderComponent>
      <h3>Controle de Gastos</h3>

      <ButtonIcon type="button">{icons[iconLeft]}</ButtonIcon>
      <ButtonIcon type="button">{icons[iconRight]}</ButtonIcon>
    </HeaderComponent>
  )
}

export default Header
