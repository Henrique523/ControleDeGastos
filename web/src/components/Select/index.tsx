/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react'
import { OptionTypeBase, Props as SelectProps } from 'react-select'
import { useField } from '@unform/core'

import { SelectComponent } from './style'

interface Props extends SelectProps<OptionTypeBase> {
  name: string
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      },
    })
  }, [fieldName, registerField, rest.isMulti])

  return <SelectComponent defaultValue={defaultValue} ref={selectRef} classNamePrefix="react-select" {...rest} />
}
export default Select
