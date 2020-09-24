import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { Input } from './BlankTextInput'

const Container = styled.div`
  position: relative;
  width: 100%;
`

const InputWithX = styled(Input)`
  background-image: url(${({ theme }) => theme.images.remove});
  background-repeat: no-repeat;
  background-size: 10px 10px;
  background-position: right center;
  background-origin: content-box;
`

const ClickableOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 32px;
  width: 32px;
  cursor: pointer;
`

interface DeletableTextInputProps {
  name: string
  placeholder?: string
  value?: string | number
  ref?: any
  onClickRemove(): void
}

export default forwardRef(
  ({ name, onClickRemove, placeholder }: DeletableTextInputProps, ref: any) => (
    <Container>
      <InputWithX
        name={name}
        type="text"
        component="input"
        placeholder={placeholder}
        ref={ref}
        autoComplete="off"
      />
      <ClickableOverlay onClick={onClickRemove} />
    </Container>
  ),
)
