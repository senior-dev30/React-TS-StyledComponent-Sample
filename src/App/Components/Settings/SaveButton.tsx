import React from 'react'
import styled from 'styled-components'

interface SaveButtonProps {
  disabled?: boolean
}
const SaveButton = styled.button<SaveButtonProps>`
  margin-top: 30px;
  width: 80px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: ${({ theme, disabled }) => !disabled && theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
`

interface SaveButtonProps {
  onClick?(): any
  disabled?: boolean
  type?: string
}

export default (props: SaveButtonProps) => <SaveButton {...props}>Save</SaveButton>
