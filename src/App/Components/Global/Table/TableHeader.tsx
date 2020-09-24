import React from 'react'
import styled from 'styled-components'

interface TableRowProps {
  height?: number
}
const TableRow = styled.div<TableRowProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : 40)}px;
  padding: 0 26px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
  border-bottom: 1px solid #eaeef5;
`
interface TableItemTitleProps {
  items: number
  fontSize?: number
}
const TableItemTitle = styled.p<TableItemTitleProps>`
  flex-basis: ${({ items }) => 100 / items}%;
  font-weight: 600;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 14)}px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
`

interface TableProps {
  columnData: string[]
  height?: number
  fontSize?: number
}
export default (props: TableProps) => {
  const { columnData: titles, height, fontSize } = props
  return (
    <TableRow height={height}>
      {titles.map((title, idx) => (
        <TableItemTitle key={`${title}-${idx}`} items={titles.length} fontSize={fontSize}>
          {title}
        </TableItemTitle>
      ))}
    </TableRow>
  )
}
