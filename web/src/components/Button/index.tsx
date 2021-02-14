import React, { ButtonHTMLAttributes } from 'react'

import { ButtonComponent } from './style'

type ButtonElement = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonElement> = ({ children, ...rest }) => {
  return <ButtonComponent {...rest}>{children}</ButtonComponent>
}

export default Button
