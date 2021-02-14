import React, { InputHTMLAttributes } from 'react'

import { InputComponent } from './style'

type InputElement = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputElement> = ({ ...rest }) => {
  return <InputComponent {...rest} />
}

export default Input
