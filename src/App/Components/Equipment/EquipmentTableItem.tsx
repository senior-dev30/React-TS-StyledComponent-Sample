import React from 'react'
import styled from 'styled-components'

interface TableItemProps {
  size?: string
  leftInset?: number
  spaceBetween?: number
  onClick?(event: React.MouseEvent<HTMLDivElement>): void
}
const TableItem = styled.div<TableItemProps>`
  display: flex;
  align-items: center;
  flex-basis: 10%;
  flex-basis: ${({ size }) => (size === 'comfortable' ? 150 : 130)}px;
  flex-grow: ${({ size }) => (size === 'comfortable' ? 6 : 1)};
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  & > * {
    margin-right: ${({ spaceBetween }) => spaceBetween || 3}px;
  }
`

export default TableItem
