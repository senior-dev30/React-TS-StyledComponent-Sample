import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface TableItemProps {
  items: number
  leftInset?: number
  spaceBetween?: number
  onClick?(event: React.MouseEvent<HTMLDivElement>): void
}
const TableItem = styled.div<TableItemProps>`
  display: flex;
  align-items: center;
  flex-basis: ${({ items }) => 100 / items}%;
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
interface TableRowStyleProps {
  hideBorder?: boolean
  checkered?: boolean
}
const TableRow = styled.div<TableRowStyleProps>`
  width: 100%;
  height: 38px;
  padding: 0 26px;
  display: flex;
  align-items: center;
  border-bottom: ${({ hideBorder }) => (hideBorder ? 0 : 1)}px solid #eaeef5;
  &:nth-child(even) {
    background-color: ${({ theme, checkered }) =>
      checkered ? theme.colors.bluishWhite : theme.colors.white};
  }
`

interface TableRowProps {
  data: { [key: string]: string | number | ReactNode }
  checkered?: boolean
  hideBorder?: boolean
}
export default ({ data, checkered, hideBorder }: TableRowProps) => (
  <TableRow checkered={checkered} hideBorder={hideBorder}>
    {Object.keys(data).map((item, idx) => (
      <TableItem key={`${item}-${idx}`} items={Object.keys(data).length}>
        {data[item]}
      </TableItem>
    ))}
  </TableRow>
)
