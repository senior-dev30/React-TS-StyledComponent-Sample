import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
`

type IProps = {
  type?: string
  disabled?: boolean
  children: ReactNode
}

export default (props: IProps) => (
  <Button type={props.type} disabled={props.disabled}>
    {props.children}
  </Button>
)
