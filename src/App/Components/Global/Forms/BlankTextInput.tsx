import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

export const Input = styled(Field)<any>`
  padding: 6px 10px;
  width: 100%;
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
`

interface BlankTextInputProps {
  name: string
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  ref?: any
}

export default forwardRef((props: BlankTextInputProps, ref: any) => (
  <Input component="input" type="text" {...props} ref={ref} />
))
