import React, { InputHTMLAttributes, useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import { InputComponent } from './style'

interface InputElement extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const Input: React.FC<InputElement> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { defaultValue, fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return <InputComponent defaultValue={defaultValue} ref={inputRef} {...rest} />
}

export default Input
