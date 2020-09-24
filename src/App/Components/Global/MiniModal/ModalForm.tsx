import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Form = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  & > * {
    margin: 10px 0;
  }
`

interface IProps {
  children: ReactNode
}
export default ({ children }: IProps) => <Form>{children}</Form>
