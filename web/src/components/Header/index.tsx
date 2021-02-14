import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiBook, FiTag } from 'react-icons/fi'

import { HeaderComponent, ButtonIcon } from './style'

interface IconProps {
  type: 'goBack' | 'cost' | 'category'
  way: string
}

interface HeaderProps {
  iconLeft: IconProps
  iconRight: IconProps
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

      <ButtonIcon>
        <Link to={`/${iconLeft.way}`}>{icons[iconLeft.type]}</Link>
      </ButtonIcon>
      <ButtonIcon>
        <Link to={`/${iconRight.way}`}>{icons[iconRight.type]}</Link>
      </ButtonIcon>
    </HeaderComponent>
  )
}

export default Header
