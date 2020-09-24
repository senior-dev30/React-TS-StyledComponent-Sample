import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ActionButtonProps {
  width?: number
  keepCase?: boolean
  noMargin?: boolean
  type?: string
  disabled?: boolean
  onClick?(): void
  children: ReactNode
}

const ActionButton = styled.div<ActionButtonProps>`
  ${({ noMargin }) => !noMargin && 'margin-top: 30px'};
  width: ${({ width }) => (width ? width : 80)}px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  ${({ keepCase }) => !keepCase && 'text-transform: uppercase'};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
`

export default (props: ActionButtonProps) => (
  <ActionButton {...props}>{props.children}</ActionButton>
)
